import { describe, expect, it, vi, afterEach } from 'vitest';
import { getAnimal } from '../../../../src/exporter/CAAS/getAnimal.js';

describe('getAnimal', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('loads but no animal was found', async () => {
    const mockHtml = `
      <html>
      </html>
    `;

    const mockFetch = vi.fn().mockResolvedValue({
      text: vi.fn().mockResolvedValue(mockHtml),
    });

    global.fetch = mockFetch;

    const animal = await getAnimal('https://example.com', 'foo');
    expect(animal).toStrictEqual(null);
  });

  it('loads but an animal was found', async () => {
    const mockHtml = `
    <html>
    <body id="page">
    <div id="cont_body">
        <table>
            <tbody>
                <tr>
                    <td valign="top" id="contingut">
                        <h1>'Gines' del CAAS</h1>
                        <table border="0">
                            <tbody>
                                <tr>
                                    <td>
                                        <img src="carregues/fotos/15579.jpg" width="250" border="1">
                                        <br>
                                        <img src="carregues/fotos2/15579.jpg" width="250" border="1">
                                    </td>
                                    <td>
                                        <table border="0" cellpadding="3" cellspacing="2">
                                            <tbody>
                                                <tr>
                                                    <td class="lletraGrisaNegreta">Número de registre</td>
                                                    <td>15579</td>
                                                </tr>
                                                <tr>
                                                    <td class="lletraGrisaNegreta">Nom de l'animal</td>
                                                    <td>Gines</td>
                                                </tr>
                                                <tr>
                                                    <td class="lletraGrisaNegreta">Especie</td>
                                                    <td>gos</td>
                                                </tr>
                                                <tr>
                                                    <td class="lletraGrisaNegreta">Raça</td>
                                                    <td>Dog argentí (creuat)</td>
                                                </tr>
                                                <tr>
                                                    <td class="lletraGrisaNegreta">Sexe</td>
                                                    <td>mascle</td>
                                                </tr>
                                                <tr>
                                                    <td class="lletraGrisaNegreta">Mida</td>
                                                    <td>gran</td>
                                                </tr>
                                                <tr>
                                                    <td class="lletraGrisaNegreta">Edat</td>
                                                    <td>10 anys i 9 mesos (març/2014)</td>
                                                </tr>
                                                <tr>
                                                    <td class="lletraGrisaNegreta">Color</td>
                                                    <td>Blanc</td>
                                                </tr>

                                                <tr>
                                                    <td class="lletraGrisaNegreta">Municipi de recollida</td>
                                                    <td>Lloret de Mar</td>
                                                </tr>
                                                <tr>
                                                    <td class="lletraGrisaNegreta">Data d'entrada al CAAS</td>
                                                    <td>30/03/2017</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </body>
    </html>`;

    const mockFetch = vi.fn().mockResolvedValue({
      text: vi.fn().mockResolvedValue(mockHtml),
    });

    global.fetch = mockFetch;

    const animal = await getAnimal('https://example.com', 'foo');
    expect(animal).toStrictEqual({
      dateOfAdmission: '2017-03-30T00:00:00.000Z',
      dateOfBirth: '2014-03-01T00:00:00.000Z',
      id: 'b1840f32-15579',
      images: [
        'https://caas.selva.cat/carregues/fotos/15579.jpg',
        'https://caas.selva.cat/carregues/fotos2/15579.jpg',
      ],
      internalId: '15579',
      isMale: true,
      isReadyForAdoption: true,
      name: 'Gines',
      organizationId: 'b1840f32',
      originUrl: 'https://example.com',
      size: 'large',
      type: 'dog',
      breed: 'Dog argentí (creuat)',
    });
  });
});
