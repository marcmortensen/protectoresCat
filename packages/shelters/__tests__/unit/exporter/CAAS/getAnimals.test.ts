import { describe, expect, it, vi, afterEach } from 'vitest';
import { getAnimals } from '../../../../src/exporter/CAAS/getAnimals.js';
import { getAnimal } from '../../../../src/exporter/CAAS/getAnimal.js';

vi.mock('../../../../src/utils/delay.js', () => {
  return {
    delay: vi.fn().mockImplementation(() => Promise.resolve()),
  };
});

vi.mock('../../../../src/exporter/CAAS/getAnimal.js', () => {
  return {
    getAnimal: vi
      .fn()
      .mockResolvedValueOnce({ id: '1', name: 'Gines' })
      .mockResolvedValueOnce({ id: '2', name: 'Cash' })
      .mockResolvedValueOnce({ id: '3', name: 'Tobias' })
      .mockResolvedValueOnce({ id: '4', name: 'Ares' })
      .mockResolvedValueOnce({ id: '5', name: 'Odin' })
      .mockResolvedValueOnce({ id: '6', name: 'Gines2' })
      .mockResolvedValueOnce({ id: '7', name: 'Cash2' })
      .mockResolvedValueOnce({ id: '8', name: 'Tobias2' })
      .mockResolvedValueOnce({ id: '9', name: 'Ares2' })
      .mockResolvedValueOnce({ id: '10', name: 'Odin2' })
      .mockResolvedValueOnce({ id: '11', name: 'Gines3' })
      .mockResolvedValueOnce({ id: '12', name: 'Cash3' })
      .mockResolvedValueOnce({ id: '13', name: 'Tobias3' })
      .mockResolvedValueOnce({ id: '14', name: 'Ares3' })
      .mockResolvedValueOnce(null),
  };
});

describe('getAnimals', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('loads but no animals were found', async () => {
    const mockHtml = `
      <html>
      </html>
    `;

    const mockFetch = vi.fn().mockResolvedValue({
      text: vi.fn().mockResolvedValue(mockHtml),
      ok: true,
    });

    global.fetch = mockFetch;

    const animals = await getAnimals();
    expect(animals).toStrictEqual([]);
    expect(getAnimal).not.toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledWith(
      'https://caas.selva.cat/registre.php',
    );
  });

  it('loads animals, and pushes only valid ones', async () => {
    const mockHtml = `
      <html>
        <body>
          <a href="animal.php?Gines" class="casella_llistat">
            <h4>Gines</h4>
          </a>
          <a href="animal.php?Cash" class="casella_llistat">
            <h4>Cash</h4>
          </a>
          <a href="animal.php?Tobias" class="casella_llistat">
            <h4>Tobias</h4>
          </a>
          <a href="animal.php?Ares" class="casella_llistat">
            <h4>Ares</h4>
          </a>
          <a href="animal.php?Odin" class="casella_llistat">
            <h4>Odin</h4>
          </a>
          <a href="animal.php?Gines2" class="casella_llistat">
            <h4>Gines2</h4>
          </a>
          <a href="animal.php?Cash2" class="casella_llistat">
            <h4>Cash2</h4>
          </a>
          <a href="animal.php?Tobias2" class="casella_llistat">
            <h4>Tobias2</h4>
          </a>
          <a href="animal.php?Ares2" class="casella_llistat">
            <h4>Ares2</h4>
          </a>
          <a href="animal.php?Odin2" class="casella_llistat">
            <h4>Odin2</h4>
          </a>
          <a href="animal.php?Gines3" class="casella_llistat">
            <h4>Gines3</h4>
          </a>
          <a href="animal.php?Cash3" class="casella_llistat">
            <h4>Cash3</h4>
          </a>
          <a href="animal.php?Tobias3" class="casella_llistat">
            <h4>Tobias3</h4>
          </a>
          <a href="animal.php?Ares3" class="casella_llistat">
            <h4>Ares3</h4>
          </a>
          <a href="animal.php?Odin3" class="casella_llistat">
            <h4>Odin3</h4>
          </a>
        </body>
      </html>
    `;

    const mockFetch = vi.fn().mockResolvedValue({
      text: vi.fn().mockResolvedValue(mockHtml),
      ok: true,
    });

    global.fetch = mockFetch;

    const animals = await getAnimals();
    expect(animals).toStrictEqual([
      { id: '1', name: 'Gines' },
      { id: '2', name: 'Cash' },
      { id: '3', name: 'Tobias' },
      { id: '4', name: 'Ares' },
      { id: '5', name: 'Odin' },
      { id: '6', name: 'Gines2' },
      { id: '7', name: 'Cash2' },
      { id: '8', name: 'Tobias2' },
      { id: '9', name: 'Ares2' },
      { id: '10', name: 'Odin2' },
      { id: '11', name: 'Gines3' },
      { id: '12', name: 'Cash3' },
      { id: '13', name: 'Tobias3' },
      { id: '14', name: 'Ares3' },
    ]);
    expect(getAnimal).toHaveBeenCalledTimes(15);
    expect(getAnimal).toHaveBeenNthCalledWith(
      1,
      'https://caas.selva.cat/animal.php?Gines',
      'Gines',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      2,
      'https://caas.selva.cat/animal.php?Cash',
      'Cash',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      3,
      'https://caas.selva.cat/animal.php?Tobias',
      'Tobias',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      4,
      'https://caas.selva.cat/animal.php?Ares',
      'Ares',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      5,
      'https://caas.selva.cat/animal.php?Odin',
      'Odin',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      6,
      'https://caas.selva.cat/animal.php?Gines2',
      'Gines2',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      7,
      'https://caas.selva.cat/animal.php?Cash2',
      'Cash2',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      8,
      'https://caas.selva.cat/animal.php?Tobias2',
      'Tobias2',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      9,
      'https://caas.selva.cat/animal.php?Ares2',
      'Ares2',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      10,
      'https://caas.selva.cat/animal.php?Odin2',
      'Odin2',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      11,
      'https://caas.selva.cat/animal.php?Gines3',
      'Gines3',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      12,
      'https://caas.selva.cat/animal.php?Cash3',
      'Cash3',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      13,
      'https://caas.selva.cat/animal.php?Tobias3',
      'Tobias3',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      14,
      'https://caas.selva.cat/animal.php?Ares3',
      'Ares3',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      15,
      'https://caas.selva.cat/animal.php?Odin3',
      'Odin3',
    );
  });
});
