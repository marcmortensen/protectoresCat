import { describe, expect, it, vi, afterEach } from 'vitest';
import { getAnimals } from '../../../../src/exporter/Rodamon/getAnimals.js';
import { getAnimal } from '../../../../src/exporter/Rodamon/getAnimal.js';

vi.mock('../../../../src/utils/delay.js', () => {
  return {
    delay: vi.fn().mockImplementation(() => Promise.resolve()),
  };
});

vi.mock('../../../../src/exporter/Rodamon/getAnimal.js', () => {
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
    });

    global.fetch = mockFetch;

    const animals = await getAnimals();
    expect(animals).toStrictEqual([]);
    expect(getAnimal).not.toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledWith(
      'https://www.aparodamon.com/wp-content/lt/lt-animals-get.php',
      {
        body: 'limit=1000&start=0&lloc=adoptar',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      },
    );
  });

  it('loads animals, and pushes only valid ones', async () => {
    const mockHtml = `
      <tr class="hidden-xs hidden-sm" style="background-color: #f6f6f6;">
                         <td><img class="img-md img-circle img-border" src="https://gestio.aparodamon.com/img_ani/foto_13725_1.jpg"></td>
                         <th scope="row">8793<p>
                         <a href="#" onclick="lt_modal_fitxa(13725);return false;"><i class="fa fa-file-text-o fa-2x alert-warning"></i></a></th>
                         <td>Gos</td>
                         <td>CREUAT</td>
                         <td>F</td>
                         <td>Petita</td>
                         <td>marro i gris</td>
                         </tr><div class="hidden-md hidden-lg">
                              <div class="row" style="margin: 0;padding: 10px; background-color: #f6f6f6;">
                                        <div style="float: left; width: 35%;"><img class="img-md img-circle img-border" src="https://gestio.aparodamon.com/img_ani/foto_13725_1.jpg"></div>
     							<div class="lt_txt_responsive" style="float: right; width: 65%;">
                                             <strong>Núm:</strong> </span>8793  |  <strong>Nom:</strong> </span>Gos<br>
                                             <strong>Raça:</strong> </span>CREUAT  |  <strong>Sexe:</strong> </span>F<br>
          							<strong>Mida:</strong> </span>Petita  |  <strong>Color:</strong> </span>marro i gris
                                             <p><a href="#" onclick="lt_modal_fitxa(13725);return false;"><i class="fa fa-file-text-o fa-2x alert-warning"></i></a></p>
                                        </div>
     				     </div>
                         </div><tr class="hidden-xs hidden-sm" style="background-color: #fff;">
                         <td><img class="img-md img-circle img-border" src="https://gestio.aparodamon.com/img_ani/foto_13723_1.jpg"></td>
                         <th scope="row">8791<p>
                         <a href="#" onclick="lt_modal_fitxa(13723);return false;"><i class="fa fa-file-text-o fa-2x alert-warning"></i></a></th>
                         <td>Gos</td>
                         <td>CREUAT</td>
                         <td>M</td>
                         <td>Petita</td>
                         <td>Marró</td>
                         </tr><div class="hidden-md hidden-lg">
                              <div class="row" style="margin: 0;padding: 10px; background-color: #fff;">
                                        <div style="float: left; width: 35%;"><img class="img-md img-circle img-border" src="https://gestio.aparodamon.com/img_ani/foto_13723_1.jpg"></div>
     							<div class="lt_txt_responsive" style="float: right; width: 65%;">
                                             <strong>Núm:</strong> </span>8791  |  <strong>Nom:</strong> </span>Gos<br>
                                             <strong>Raça:</strong> </span>CREUAT  |  <strong>Sexe:</strong> </span>M<br>
          							<strong>Mida:</strong> </span>Petita  |  <strong>Color:</strong> </span>Marró
                                             <p><a href="#" onclick="lt_modal_fitxa(13723);return false;"><i class="fa fa-file-text-o fa-2x alert-warning"></i></a></p>
                                        </div>
     				     </div>
                         </div><tr class="hidden-xs hidden-sm" style="background-color: #f6f6f6;">
                         <td><img class="img-md img-circle img-border" src="https://gestio.aparodamon.com/img_ani/foto_13722_1.jpg"></td>
                         <th scope="row">8790-<p>
                         <a href="#" onclick="lt_modal_fitxa(13722);return false;"><i class="fa fa-file-text-o fa-2x alert-warning"></i></a></th>
                         <td>Gat</td>
                         <td>COMU</td>
                         <td>M</td>
                         <td>Gran</td>
                         <td>beig</td>
                         </tr><div class="hidden-md hidden-lg">
                              <div class="row" style="margin: 0;padding: 10px; background-color: #f6f6f6;">
                                        <div style="float: left; width: 35%;"><img class="img-md img-circle img-border" src="https://gestio.aparodamon.com/img_ani/foto_13722_1.jpg"></div>
     							<div class="lt_txt_responsive" style="float: right; width: 65%;">
                                             <strong>Núm:</strong> </span>8790-  |  <strong>Nom:</strong> </span>Gat<br>
                                             <strong>Raça:</strong> </span>COMU  |  <strong>Sexe:</strong> </span>M<br>
          							<strong>Mida:</strong> </span>Gran  |  <strong>Color:</strong> </span>beig
                                             <p><a href="#" onclick="lt_modal_fitxa(13722);return false;"><i class="fa fa-file-text-o fa-2x alert-warning"></i></a></p>
                                        </div>
     				     </div>
                         </div><tr class="hidden-xs hidden-sm" style="background-color: #fff;">
                         <td><img class="img-md img-circle img-border" src="https://gestio.aparodamon.com/img_ani/foto_13721_1.jpg"></td>
                         <th scope="row">8789-<p>
                         <a href="#" onclick="lt_modal_fitxa(13721);return false;"><i class="fa fa-file-text-o fa-2x alert-warning"></i></a></th>
                         <td>Gos</td>
                         <td>CREUAT</td>
                         <td>F</td>
                         <td>Mitjana</td>
                         <td>Negre</td>
                         </tr><div class="hidden-md hidden-lg">
                              <div class="row" style="margin: 0;padding: 10px; background-color: #fff;">
                                        <div style="float: left; width: 35%;"><img class="img-md img-circle img-border" src="https://gestio.aparodamon.com/img_ani/foto_13721_1.jpg"></div>
     							<div class="lt_txt_responsive" style="float: right; width: 65%;">
                                             <strong>Núm:</strong> </span>8789-  |  <strong>Nom:</strong> </span>Gos<br>
                                             <strong>Raça:</strong> </span>CREUAT  |  <strong>Sexe:</strong> </span>F<br>
          							<strong>Mida:</strong> </span>Mitjana  |  <strong>Color:</strong> </span>Negre
                                             <p><a href="#" onclick="lt_modal_fitxa(13721);return false;"><i class="fa fa-file-text-o fa-2x alert-warning"></i></a></p>
                                        </div>
     				     </div>
                         </div><tr class="hidden-xs hidden-sm" style="background-color: #f6f6f6;">
                         <td><img class="img-md img-circle img-border" src="https://gestio.aparodamon.com/img_ani/foto_13717_1.jpg"></td>
                         <th scope="row">8785-<p>
                         <a href="#" onclick="lt_modal_fitxa(13717);return false;"><i class="fa fa-file-text-o fa-2x alert-warning"></i></a></th>
                         <td>Gos</td>
                         <td>CREUAT</td>
                         <td>F</td>
                         <td>Mitjana</td>
                         <td>blanc i negre</td>
                         </tr><div class="hidden-md hidden-lg">
                              <div class="row" style="margin: 0;padding: 10px; background-color: #f6f6f6;">
                                        <div style="float: left; width: 35%;"><img class="img-md img-circle img-border" src="https://gestio.aparodamon.com/img_ani/foto_13717_1.jpg"></div>
     							<div class="lt_txt_responsive" style="float: right; width: 65%;">
                                             <strong>Núm:</strong> </span>8785-  |  <strong>Nom:</strong> </span>Gos<br>
                                             <strong>Raça:</strong> </span>CREUAT  |  <strong>Sexe:</strong> </span>F<br>
          							<strong>Mida:</strong> </span>Mitjana  |  <strong>Color:</strong> </span>blanc i negre
                                             <p><a href="#" onclick="lt_modal_fitxa(13717);return false;"><i class="fa fa-file-text-o fa-2x alert-warning"></i></a></p>
                                        </div>
     				     </div>
                         </div><tr class="hidden-xs hidden-sm" style="background-color: #fff;">
                         <td><img class="img-md img-circle img-border" src="https://gestio.aparodamon.com/img_ani/foto_13716_1.jpg"></td>
                         <th scope="row">8784-<p>
                         <a href="#" onclick="lt_modal_fitxa(13716);return false;"><i class="fa fa-file-text-o fa-2x alert-warning"></i></a></th>
                         <td>Gos</td>
                         <td>X BOXER</td>
                         <td>M</td>
                         <td>Mitjana</td>
                         <td>negre i blanc</td>
                         </tr><div class="hidden-md hidden-lg">
                              <div class="row" style="margin: 0;padding: 10px; background-color: #fff;">
                                        <div style="float: left; width: 35%;"><img class="img-md img-circle img-border" src="https://gestio.aparodamon.com/img_ani/foto_13716_1.jpg"></div>
     							<div class="lt_txt_responsive" style="float: right; width: 65%;">
                                             <strong>Núm:</strong> </span>8784-  |  <strong>Nom:</strong> </span>Gos<br>
                                             <strong>Raça:</strong> </span>X BOXER  |  <strong>Sexe:</strong> </span>M<br>
          							<strong>Mida:</strong> </span>Mitjana  |  <strong>Color:</strong> </span>negre i blanc
                                             <p><a href="#" onclick="lt_modal_fitxa(13716);return false;"><i class="fa fa-file-text-o fa-2x alert-warning"></i></a></p>
                                        </div>
     				     </div>
                         </div><tr class="hidden-xs hidden-sm" style="background-color: #f6f6f6;">
                         <td><img class="img-md img-circle img-border" src="https://gestio.aparodamon.com/img_ani/foto_13715_1.jpg"></td>
                         <th scope="row">8783-<p>
                         <a href="#" onclick="lt_modal_fitxa(13715);return false;"><i class="fa fa-file-text-o fa-2x alert-warning"></i></a></th>
                         <td>Gos</td>
                         <td>X PITBULL</td>
                         <td>F</td>
                         <td>Mitjana</td>
                         <td>gris</td>
                         </tr><div class="hidden-md hidden-lg">
                              <div class="row" style="margin: 0;padding: 10px; background-color: #f6f6f6;">
                                        <div style="float: left; width: 35%;"><img class="img-md img-circle img-border" src="https://gestio.aparodamon.com/img_ani/foto_13715_1.jpg"></div>
     							<div class="lt_txt_responsive" style="float: right; width: 65%;">
                                             <strong>Núm:</strong> </span>8783-  |  <strong>Nom:</strong> </span>Gos<br>
                                             <strong>Raça:</strong> </span>X PITBULL  |  <strong>Sexe:</strong> </span>F<br>
          							<strong>Mida:</strong> </span>Mitjana  |  <strong>Color:</strong> </span>gris
                                             <p><a href="#" onclick="lt_modal_fitxa(13715);return false;"><i class="fa fa-file-text-o fa-2x alert-warning"></i></a></p>
                                        </div>
     				     </div>
                         </div><tr class="hidden-xs hidden-sm" style="background-color: #fff;">
                         <td><img class="img-md img-circle img-border" src="https://gestio.aparodamon.com/img_ani/foto_13713_1.jpg"></td>
                         <th scope="row">8781<p>
                         <a href="#" onclick="lt_modal_fitxa(13713);return false;"><i class="fa fa-file-text-o fa-2x alert-warning"></i></a></th>
                         <td>Gos</td>
                         <td>BULLDOG-ANGLES -X</td>
                         <td>M</td>
                         <td>Mitjana</td>
                         <td>blanc i marro</td>
                         </tr><div class="hidden-md hidden-lg">
                              <div class="row" style="margin: 0;padding: 10px; background-color: #fff;">
                                        <div style="float: left; width: 35%;"><img class="img-md img-circle img-border" src="https://gestio.aparodamon.com/img_ani/foto_13713_1.jpg"></div>
     							<div class="lt_txt_responsive" style="float: right; width: 65%;">
                                             <strong>Núm:</strong> </span>8781  |  <strong>Nom:</strong> </span>Gos<br>
                                             <strong>Raça:</strong> </span>BULLDOG-ANGLES -X  |  <strong>Sexe:</strong> </span>M<br>
          							<strong>Mida:</strong> </span>Mitjana  |  <strong>Color:</strong> </span>blanc i marro
                                             <p><a href="#" onclick="lt_modal_fitxa(13713);return false;"><i class="fa fa-file-text-o fa-2x alert-warning"></i></a></p>
                                        </div>
     				     </div>
                         </div><tr class="hidden-xs hidden-sm" style="background-color: #f6f6f6;">
                         <td><img class="img-md img-circle img-border" src="https://gestio.aparodamon.com/img_ani/foto_13710_1.jpg"></td>
                         <th scope="row">8778<p>
                         <a href="#" onclick="lt_modal_fitxa(13710);return false;"><i class="fa fa-file-text-o fa-2x alert-warning"></i></a></th>
                         <td>Gat</td>
                         <td>COMU</td>
                         <td>M</td>
                         <td>Gran</td>
                         <td>Altres</td>
                         </tr><div class="hidden-md hidden-lg">
                              <div class="row" style="margin: 0;padding: 10px; background-color: #f6f6f6;">
                                        <div style="float: left; width: 35%;"><img class="img-md img-circle img-border" src="https://gestio.aparodamon.com/img_ani/foto_13710_1.jpg"></div>
     							<div class="lt_txt_responsive" style="float: right; width: 65%;">
                                             <strong>Núm:</strong> </span>8778  |  <strong>Nom:</strong> </span>Gat<br>
                                             <strong>Raça:</strong> </span>COMU  |  <strong>Sexe:</strong> </span>M<br>
          							<strong>Mida:</strong> </span>Gran  |  <strong>Color:</strong> </span>Altres
                                             <p><a href="#" onclick="lt_modal_fitxa(13710);return false;"><i class="fa fa-file-text-o fa-2x alert-warning"></i></a></p>
                                        </div>
     				     </div>
                         </div><tr class="hidden-xs hidden-sm" style="background-color: #fff;">
                         <td><img class="img-md img-circle img-border" src="https://gestio.aparodamon.com/img_ani/foto_13686_1.jpg"></td>
                         <th scope="row">8754-<p>
                         <a href="#" onclick="lt_modal_fitxa(13686);return false;"><i class="fa fa-file-text-o fa-2x alert-warning"></i></a></th>
                         <td>Gos</td>
                         <td>AMERICAN BULLY XL</td>
                         <td>M</td>
                         <td>Mitjana</td>
                         <td>gris i blanc</td>
                         </tr><div class="hidden-md hidden-lg">
                              <div class="row" style="margin: 0;padding: 10px; background-color: #fff;">
                                        <div style="float: left; width: 35%;"><img class="img-md img-circle img-border" src="https://gestio.aparodamon.com/img_ani/foto_13686_1.jpg"></div>
     							<div class="lt_txt_responsive" style="float: right; width: 65%;">
                                             <strong>Núm:</strong> </span>8754-  |  <strong>Nom:</strong> </span>Gos<br>
                                             <strong>Raça:</strong> </span>AMERICAN BULLY XL  |  <strong>Sexe:</strong> </span>M<br>
          							<strong>Mida:</strong> </span>Mitjana  |  <strong>Color:</strong> </span>gris i blanc
                                             <p><a href="#" onclick="lt_modal_fitxa(13686);return false;"><i class="fa fa-file-text-o fa-2x alert-warning"></i></a></p>
                                        </div>
     				     </div>
                         </div>
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
    ]);
    expect(getAnimal).toHaveBeenCalledTimes(10);
    expect(getAnimal).toHaveBeenNthCalledWith(
      1,
      'https://www.aparodamon.com/wp-content/lt/lt-animals-fitxa.php?id=13725',
      '8793',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      2,
      'https://www.aparodamon.com/wp-content/lt/lt-animals-fitxa.php?id=13723',
      '8791',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      3,
      'https://www.aparodamon.com/wp-content/lt/lt-animals-fitxa.php?id=13722',
      '8790-',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      4,
      'https://www.aparodamon.com/wp-content/lt/lt-animals-fitxa.php?id=13721',
      '8789-',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      5,
      'https://www.aparodamon.com/wp-content/lt/lt-animals-fitxa.php?id=13717',
      '8785-',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      6,
      'https://www.aparodamon.com/wp-content/lt/lt-animals-fitxa.php?id=13716',
      '8784-',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      7,
      'https://www.aparodamon.com/wp-content/lt/lt-animals-fitxa.php?id=13715',
      '8783-',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      8,
      'https://www.aparodamon.com/wp-content/lt/lt-animals-fitxa.php?id=13713',
      '8781',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      9,
      'https://www.aparodamon.com/wp-content/lt/lt-animals-fitxa.php?id=13710',
      '8778',
    );
    expect(getAnimal).toHaveBeenNthCalledWith(
      10,
      'https://www.aparodamon.com/wp-content/lt/lt-animals-fitxa.php?id=13686',
      '8754-',
    );
  });
});
