import { describe, expect, it, vi, afterEach } from 'vitest';
import { getAnimal } from '../../../../src/exporter/Rodamon/getAnimal.js';
import { formatMonthToDateMonth } from '../../../../src/utils/date.js';

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
    
<div class="modal fade in lt_modal-modal" id="ltmodal" tabindex="-1" data-keyboard="false" data-backdrop="static" role="dialog" aria-labelledby="ltmodal" aria-hidden="true" data-show="true" style="display: block;">
	<div class="modal-dialog" style="width: 90%; max-width: 900px;">
		<div class="modal-content">
			<div class="modal-header lt_modal-header">
			    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				<span class="modal-title lt_modal-title">Fitxa de l'animal</span>
			</div>
			<div class="modal-body ">


<div style="margin-bottom: 20px;text-align: right;">
<a title="Compartir facebook" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.aparodamon.com%2Ffitxa-animal%2Fgoscreuat-13489%2F"><img src="https://www.aparodamon.com/wp-content/lt/img/FBcompartir.png"></a>
</div>

<table class="TablaMarcFitxa"  width="100%" style="background-color: #f6f6f6;">
	<tr>
		<td class="hidden-xs" width="200px"><img src="https://gestio.aparodamon.com/img_ani/foto_13489_1.jpg" width='200'></td>
		<td>
			<span class=etiqueta10n>Tipus animal:</span> Gos			<br>
			<span class=etiqueta10n>Color:</span> Atigrat			<br>
			<span class=etiqueta10n>Estat:</span> Bo			<br>
			<span class=etiqueta10n>Mida:</span> Gran			<br>
			<span class=etiqueta10n>Pel:</span> Curt			<br>
			<span class=etiqueta10n>Raça:</span> CREUAT			<br>
			<span class=etiqueta10n>Sexe:</span> M			<br>
			<span  class=etiqueta10n>Anys:</span> 5'00<br>			<span class=etiqueta10n>Núm. xip:</span> ***5000002352***			<br>
			<span class=etiqueta10n>Municipi:</span> Calonge			<br>
			<span class=etiqueta10n>Data entrada:</span> 22-04-2024			<br>
			<span class=etiqueta10n>Data d'alta servei adopcions:</span> 12-05-2024			<br>
			<span class=etiqueta10n>Núm registre al A.P.A. Rodamón:</span> 8557-			<p>		</td>
	</tr>
	</table>
	<p>
	<FIELDSET><LEGEND class="texto_legend">Imatges relacionades:</LEGEND></FIELDSET>
	<table width="100%" class="TablaMarcFitxa" style="background-color: #f6f6f6;">
	<tr>
	<td valign=center><a href="javascript:finestra('https://gestio.aparodamon.com/img_ani/foto_13489_1.jpg','foto','700','550','','','NO')"><img src="https://gestio.aparodamon.com/img_ani/foto_13489_1.jpg" width=85 border=0></a>
<a href="javascript:finestra('https://gestio.aparodamon.com/img_ani/foto_13489_2.jpg','foto','700','550','','','NO')"><img src="https://gestio.aparodamon.com/img_ani/foto_13489_2.jpg" width=85 border=0></a>
<a href="javascript:finestra('https://gestio.aparodamon.com/img_ani/foto_13489_3.jpg','foto','700','550','','','NO')"><img src="https://gestio.aparodamon.com/img_ani/foto_13489_3.jpg" width=85 border=0></a>
<a href="javascript:finestra('https://gestio.aparodamon.com/img_ani/foto_13489_4.jpg','foto','700','550','','','NO')"><img src="https://gestio.aparodamon.com/img_ani/foto_13489_4.jpg" width=85 border=0></a>
</td>
	</tr>
	</table>
	<p>
	<center>Abans d'adoptar un animal hauràs de valorar els avantatges i els inconvenients, i els tràmits necessaris per adoptar-lo</center>

			</div>
			<div class="modal-footer lt_modal-footer">
				<button id="cerrar-fitxa" type="button" class="btn btn-default" data-dismiss="modal">Tancar</button>
			</div>
		</div>
	</div>
</div>
`;

    const mockFetch = vi.fn().mockResolvedValue({
      text: vi.fn().mockResolvedValue(mockHtml),
    });

    const date = new Date();

    global.fetch = mockFetch;

    const animal = await getAnimal(
      'https://www.aparodamon.com/wp-content/lt/lt-animals-fitxa.php?id=13489',
      'foo',
    );
    expect(animal).toStrictEqual({
      id: 'e21ae529-13489',
      isMale: true,
      isReadyForAdoption: true,
      name: 'foo',
      organizationId: 'e21ae529',
      originUrl:
        'https://www.aparodamon.com/wp-content/lt/lt-animals-fitxa.php?id=13489',
      size: 'large',
      type: 'dog',
      breed: 'Creuat',
      dateOfAdmission: '2024-04-22T00:00:00.000Z',
      dateOfBirth: `${date.getFullYear() - 5}-${formatMonthToDateMonth(date.getMonth())}-01T00:00:00.000Z`,
      images: [
        'https://gestio.aparodamon.com/img_ani/foto_13489_1.jpg',
        'https://gestio.aparodamon.com/img_ani/foto_13489_2.jpg',
        'https://gestio.aparodamon.com/img_ani/foto_13489_3.jpg',
        'https://gestio.aparodamon.com/img_ani/foto_13489_4.jpg',
      ],
      internalId: '13489',
    });
  });
});
