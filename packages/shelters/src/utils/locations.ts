/*export interface _Province {
  name: string;
  slug: 'barcelona' | 'girona' | 'lleida' | 'tarragona';
  regions: _Region['slug'][];
}

export interface _Region {
  name: string;
  slug: string;
  connectedTo: Region[];
  province: 'barcelona' | 'girona' | 'lleida' | 'tarragona';
}
*/
export type Province = 'barcelona' | 'girona' | 'lleida' | 'tarragona';

export type Region =
  | 'alt-camp'
  | 'alt-emporda'
  | 'alt-penedes'
  | 'alt-urgell'
  | 'alta-ribagorca'
  | 'anoia'
  | 'aran'
  | 'bages'
  | 'baix-camp'
  | 'baix-ebre'
  | 'baix-emporda'
  | 'baix-llobregat'
  | 'baix-penedes'
  | 'barcelones'
  | 'bergueda'
  | 'cerdanya'
  | 'conca-de-barbera'
  | 'garraf'
  | 'garrigues'
  | 'garrotxa'
  | 'girones'
  | 'llucanes'
  | 'maresme'
  | 'moianes'
  | 'montsia'
  | 'noguera'
  | 'osona'
  | 'pallars-jussa'
  | 'pallars-sobira'
  | 'pla-de-lestany'
  | 'pla-durgell'
  | 'priorat'
  | 'ribera-debre'
  | 'ripolles'
  | 'segarra'
  | 'segria'
  | 'selva'
  | 'solsones'
  | 'tarragones'
  | 'terra-alta'
  | 'urgell'
  | 'valles-occidental'
  | 'valles-oriental';

export type Municipality =
  | 'Abella de la Conca'
  | 'Abrera'
  | 'Agramunt'
  | 'Aguilar de Segarra'
  | 'Agullana'
  | 'Aiguafreda'
  | 'Aiguamúrcia'
  | 'Aiguaviva'
  | 'Aitona'
  | 'Albanyà'
  | 'Albatàrrec'
  | 'Albesa'
  | 'Albinyana'
  | 'Albons'
  | 'Alcanar'
  | 'Alcanó'
  | 'Alcarràs'
  | 'Alcoletge'
  | 'Alcover'
  | 'Aldover'
  | 'Alella'
  | 'Alfara de Carles'
  | 'Alfarràs'
  | 'Alforja'
  | 'Alfés'
  | 'Algerri'
  | 'Alguaire'
  | 'Alins'
  | 'Alió'
  | 'Almacelles'
  | 'Almatret'
  | 'Almenar'
  | 'Almoster'
  | 'Alp'
  | 'Alpens'
  | 'Alpicat'
  | 'Alt Àneu'
  | 'Altafulla'
  | 'Alàs i Cerc'
  | 'Alòs de Balaguer'
  | 'Amer'
  | 'Amposta'
  | 'Anglesola'
  | 'Anglès'
  | 'Arbeca'
  | 'Arbolí'
  | 'Arbúcies'
  | 'Arenys de Mar'
  | 'Arenys de Munt'
  | 'Argelaguer'
  | 'Argentona'
  | 'Argençola'
  | 'Arnes'
  | 'Arres'
  | 'Arsèguel'
  | 'Artesa de Lleida'
  | 'Artesa de Segre'
  | 'Artés'
  | 'Ascó'
  | 'Aspa'
  | 'Avinyonet de Puigventós'
  | 'Avinyonet del Penedès'
  | 'Avinyó'
  | 'Avià'
  | 'Badalona'
  | 'Badia del Vallès'
  | 'Bagà'
  | 'Baix Pallars'
  | 'Balaguer'
  | 'Balenyà'
  | 'Balsareny'
  | 'Banyeres del Penedès'
  | 'Banyoles'
  | 'Barbens'
  | 'Barberà de la Conca'
  | 'Barberà del Vallès'
  | 'Barcelona'
  | 'Bassella'
  | 'Batea'
  | 'Bausen'
  | 'Begues'
  | 'Begur'
  | 'Belianes'
  | "Bell-lloc d'Urgell"
  | 'Bellaguarda'
  | "Bellcaire d'Empordà"
  | "Bellcaire d'Urgell"
  | "Bellmunt d'Urgell"
  | 'Bellmunt del Priorat'
  | 'Bellprat'
  | 'Bellpuig'
  | 'Bellvei'
  | 'Bellver de Cerdanya'
  | 'Bellvís'
  | 'Benavent de Segrià'
  | 'Benifallet'
  | 'Benissanet'
  | 'Berga'
  | 'Besalú'
  | 'Bescanó'
  | 'Beuda'
  | 'Bigues i Riells del Fai'
  | 'Biosca'
  | 'Biure'
  | 'Blancafort'
  | 'Blanes'
  | 'Boadella i les Escaules'
  | 'Bolvir'
  | 'Bonastre'
  | 'Bordils'
  | 'Borrassà'
  | 'Borredà'
  | 'Bossòst'
  | 'Bot'
  | 'Botarell'
  | 'Bovera'
  | 'Breda'
  | 'Brunyola i Sant Martí Sapresa'
  | 'Bràfim'
  | 'Bàscara'
  | 'Cabanabona'
  | 'Cabanelles'
  | 'Cabanes'
  | 'Cabassers'
  | 'Cabra del Camp'
  | "Cabrera d'Anoia"
  | 'Cabrera de Mar'
  | 'Cabrils'
  | 'Cabó'
  | 'Cadaqués'
  | 'Calaf'
  | 'Calafell'
  | 'Calders'
  | "Caldes d'Estrac"
  | 'Caldes de Malavella'
  | 'Caldes de Montbui'
  | 'Calella'
  | 'Calldetenes'
  | 'Callús'
  | 'Calonge de Segarra'
  | 'Calonge i Sant Antoni'
  | 'Camarasa'
  | 'Camarles'
  | 'Cambrils'
  | 'Campdevànol'
  | 'Campelles'
  | 'Campins'
  | 'Campllong'
  | 'Campmany'
  | 'Camprodon'
  | 'Camós'
  | 'Canejan'
  | "Canet d'Adri"
  | 'Canet de Mar'
  | 'Canovelles'
  | 'Cantallops'
  | 'Canyelles'
  | 'Capafonts'
  | 'Capellades'
  | 'Capolat'
  | 'Capçanes'
  | 'Cardedeu'
  | 'Cardona'
  | 'Carme'
  | 'Caseres'
  | 'Casserres'
  | 'Cassà de la Selva'
  | "Castell d'Aro, Platja d'Aro i s'Agaró"
  | 'Castell de Mur'
  | "Castell de l'Areny"
  | 'Castellar de la Ribera'
  | "Castellar de n'Hug"
  | 'Castellar del Riu'
  | 'Castellar del Vallès'
  | 'Castellbell i el Vilar'
  | 'Castellbisbal'
  | 'Castellcir'
  | 'Castelldans'
  | 'Castelldefels'
  | 'Castellet i la Gornal'
  | 'Castellfollit de Riubregós'
  | 'Castellfollit de la Roca'
  | 'Castellfollit del Boix'
  | 'Castellgalí'
  | 'Castellnou de Bages'
  | 'Castellnou de Seana'
  | 'Castellolí'
  | 'Castellserà'
  | 'Castellterçol'
  | 'Castellvell del Camp'
  | 'Castellví de Rosanes'
  | 'Castellví de la Marca'
  | "Castelló d'Empúries"
  | 'Castelló de Farfanya'
  | 'Cava'
  | 'Celrà'
  | 'Centelles'
  | 'Cercs'
  | 'Cerdanyola del Vallès'
  | 'Cervelló'
  | 'Cervera'
  | 'Cervià de Ter'
  | 'Cervià de les Garrigues'
  | 'Cistella'
  | 'Ciutadilla'
  | 'Clariana de Cardener'
  | 'Colera'
  | 'Coll de Nargó'
  | 'Collbató'
  | 'Colldejou'
  | 'Collsuspina'
  | 'Colomers'
  | 'Conca de Dalt'
  | 'Conesa'
  | 'Constantí'
  | 'Copons'
  | "Corbera d'Ebre"
  | 'Corbera de Llobregat'
  | 'Corbins'
  | 'Cornellà de Llobregat'
  | 'Cornellà del Terri'
  | 'Cornudella de Montsant'
  | 'Corçà'
  | 'Creixell'
  | 'Crespià'
  | "Cruïlles, Monells i Sant Sadurní de l'Heura"
  | 'Cubelles'
  | 'Cubells'
  | 'Cunit'
  | 'Cànoves i Samalús'
  | 'Darnius'
  | 'Das'
  | 'Deltebre'
  | 'Dosrius'
  | 'Duesaigües'
  | 'Es Bòrdes'
  | 'Esparreguera'
  | 'Espinelves'
  | 'Esplugues de Llobregat'
  | 'Espolla'
  | 'Esponellà'
  | 'Espot'
  | 'Estamariu'
  | 'Estaràs'
  | "Esterri d'Àneu"
  | 'Esterri de Cardós'
  | 'Falset'
  | 'Farrera'
  | 'Figueres'
  | 'Figuerola del Camp'
  | 'Flaçà'
  | 'Flix'
  | 'Fogars de Montclús'
  | 'Fogars de la Selva'
  | 'Foixà'
  | 'Folgueroles'
  | 'Fondarella'
  | 'Fonollosa'
  | 'Font-rubí'
  | 'Fontanals de Cerdanya'
  | 'Fontanilles'
  | 'Fontcoberta'
  | 'Foradada'
  | 'Fornells de la Selva'
  | 'Fortià'
  | 'Forès'
  | 'Freginals'
  | 'Fulleda'
  | 'Fígols'
  | 'Fígols i Alinyà'
  | 'Gaià'
  | 'Gallifa'
  | 'Gandesa'
  | 'Garcia'
  | 'Garrigoles'
  | 'Garriguella'
  | 'Garrigàs'
  | 'Gavet de la Conca'
  | 'Gavà'
  | 'Gelida'
  | 'Ger'
  | 'Gimenells i el Pla de la Font'
  | 'Ginestar'
  | 'Girona'
  | 'Gironella'
  | 'Gisclareny'
  | 'Godall'
  | 'Golmés'
  | 'Gombrèn'
  | 'Granera'
  | 'Granollers'
  | 'Granyanella'
  | 'Granyena de Segarra'
  | 'Granyena de les Garrigues'
  | 'Gratallops'
  | 'Gualba'
  | 'Gualta'
  | 'Guardiola de Berguedà'
  | 'Guils de Cerdanya'
  | 'Guimerà'
  | 'Guissona'
  | 'Guixers'
  | 'Gurb'
  | 'Gósol'
  | 'Horta de Sant Joan'
  | 'Hostalric'
  | 'Igualada'
  | 'Isona i Conca Dellà'
  | 'Isòvol'
  | "Ivars d'Urgell"
  | 'Ivars de Noguera'
  | 'Ivorra'
  | 'Jafre'
  | 'Jorba'
  | 'Josa i Tuixén'
  | 'Juià'
  | 'Juncosa'
  | 'Juneda'
  | 'Les'
  | 'Linyola'
  | 'Lladorre'
  | 'Lladurs'
  | 'Llagostera'
  | 'Llambilles'
  | 'Llanars'
  | 'Llançà'
  | 'Llardecans'
  | 'Llavorsí'
  | 'Lledó'
  | 'Lleida'
  | 'Llers'
  | 'Lles de Cerdanya'
  | 'Llimiana'
  | 'Llinars del Vallès'
  | "Lliçà d'Amunt"
  | 'Lliçà de Vall'
  | 'Llobera'
  | 'Llorac'
  | 'Llorenç del Penedès'
  | 'Lloret de Mar'
  | 'Lluçà'
  | 'Llívia'
  | 'Madremanya'
  | 'Maials'
  | 'Maià de Montcal'
  | 'Maldà'
  | 'Malgrat de Mar'
  | 'Malla'
  | 'Manlleu'
  | 'Manresa'
  | 'Margalef'
  | 'Marganell'
  | 'Martorell'
  | 'Martorelles'
  | 'Marçà'
  | 'Mas de Barberans'
  | 'Masarac i Vilarnadal'
  | 'Masdenverge'
  | 'Masllorenç'
  | 'Maspujols'
  | 'Masquefa'
  | 'Massalcoreig'
  | 'Massoteres'
  | 'Matadepera'
  | 'Mataró'
  | 'Maçanes'
  | 'Maçanet de Cabrenys'
  | 'Maçanet de la Selva'
  | 'Mediona'
  | 'Menàrguens'
  | 'Meranges'
  | 'Mieres'
  | 'Miralcamp'
  | 'Miravet'
  | 'Moià'
  | 'Molins de Rei'
  | 'Mollerussa'
  | 'Mollet de Peralada'
  | 'Mollet del Vallès'
  | 'Molló'
  | 'Monistrol de Calders'
  | 'Monistrol de Montserrat'
  | 'Mont-ral'
  | 'Mont-ras'
  | 'Mont-roig del Camp'
  | 'Montagut i Oix'
  | 'Montblanc'
  | 'Montbrió del Camp'
  | 'Montcada i Reixac'
  | 'Montclar'
  | 'Montellà i Martinet'
  | 'Montesquiu'
  | 'Montferrer i Castellbò'
  | 'Montferri'
  | 'Montgai'
  | 'Montgat'
  | 'Montmajor'
  | 'Montmaneu'
  | 'Montmeló'
  | 'Montoliu de Lleida'
  | 'Montoliu de Segarra'
  | 'Montornès de Segarra'
  | 'Montornès del Vallès'
  | 'Montseny'
  | 'Muntanyola'
  | 'Mura'
  | "Móra d'Ebre"
  | 'Móra la Nova'
  | 'Nalec'
  | 'Naut Aran'
  | 'Navarcles'
  | 'Navars'
  | 'Navata'
  | 'Navès'
  | 'Nulles'
  | 'Odèn'
  | 'Ogassa'
  | 'Olesa de Bonesvalls'
  | 'Olesa de Montserrat'
  | 'Oliana'
  | 'Oliola'
  | 'Olius'
  | 'Olivella'
  | 'Olost'
  | 'Olot'
  | 'Olvan'
  | 'Olèrdola'
  | 'Ordis'
  | 'Organyà'
  | 'Oristà'
  | 'Orpí'
  | 'Orís'
  | 'Os de Balaguer'
  | 'Osor'
  | 'Ossó de Sió'
  | 'Pacs del Penedès'
  | 'Palafolls'
  | 'Palafrugell'
  | 'Palamós'
  | 'Palau de Santa Eulàlia'
  | 'Palau-sator'
  | 'Palau-saverdera'
  | 'Palau-solità i Plegamans'
  | 'Pallejà'
  | 'Palol de Revardit'
  | 'Pals'
  | 'Pardines'
  | 'Parets del Vallès'
  | 'Parlavà'
  | 'Passanant i Belltall'
  | 'Pau'
  | 'Paüls'
  | 'Pedret i Marzà'
  | 'Penelles'
  | 'Perafita'
  | 'Perafort'
  | 'Peralada'
  | 'Peramola'
  | 'Piera'
  | 'Pineda de Mar'
  | 'Pinell de Solsonès'
  | 'Pinós'
  | 'Pira'
  | 'Planoles'
  | 'Poboleda'
  | 'Polinyà'
  | 'Pont de Molins'
  | 'Pontils'
  | 'Pontons'
  | 'Ponts'
  | 'Pontós'
  | 'Porqueres'
  | 'Porrera'
  | 'Portbou'
  | 'Pradell de la Teixeta'
  | 'Prades'
  | 'Prat de Comte'
  | 'Pratdip'
  | 'Prats de Lluçanès'
  | 'Prats i Sansor'
  | 'Preixana'
  | 'Preixens'
  | 'Premià de Dalt'
  | 'Premià de Mar'
  | 'Prullans'
  | 'Puig-reig'
  | 'Puigcerdà'
  | 'Puigdàlber'
  | 'Puiggròs'
  | 'Puigpelat'
  | "Puigverd d'Agramunt"
  | 'Puigverd de Lleida'
  | 'Pujalt'
  | 'Quart'
  | 'Queralbs'
  | 'Querol'
  | 'Rabós'
  | 'Rajadell'
  | 'Rasquera'
  | 'Regencós'
  | 'Rellinars'
  | 'Renau'
  | 'Reus'
  | 'Rialb'
  | "Riba-roja d'Ebre"
  | "Ribera d'Ondara"
  | "Ribera d'Urgellet"
  | 'Ribes de Freser'
  | 'Riells i Viabrea'
  | 'Riner'
  | 'Ripoll'
  | 'Ripollet'
  | 'Riu de Cerdanya'
  | 'Riudarenes'
  | 'Riudaura'
  | 'Riudecanyes'
  | 'Riudecols'
  | 'Riudellots de la Selva'
  | 'Riudoms'
  | 'Riumors'
  | 'Rocafort de Queralt'
  | 'Roda de Berà'
  | 'Roda de Ter'
  | 'Rodonyà'
  | 'Roquetes'
  | 'Roses'
  | 'Rosselló'
  | 'Rubió'
  | 'Rubí'
  | 'Rupit i Pruit'
  | 'Rupià'
  | 'Sabadell'
  | 'Sagàs'
  | 'Saldes'
  | 'Sales de Llierca'
  | 'Sallent'
  | 'Salomó'
  | 'Salou'
  | 'Salt'
  | 'Salàs de Pallars'
  | 'Sanaüja'
  | 'Sant Adrià de Besòs'
  | 'Sant Agustí de Lluçanès'
  | 'Sant Andreu Salou'
  | 'Sant Andreu de Llavaneres'
  | 'Sant Andreu de la Barca'
  | 'Sant Aniol de Finestres'
  | 'Sant Antoni de Vilamajor'
  | 'Sant Bartomeu del Grau'
  | 'Sant Boi de Llobregat'
  | 'Sant Boi de Lluçanès'
  | 'Sant Cebrià de Vallalta'
  | 'Sant Celoni'
  | 'Sant Climent Sescebes'
  | 'Sant Climent de Llobregat'
  | 'Sant Cugat Sesgarrigues'
  | 'Sant Cugat del Vallès'
  | 'Sant Esteve Sesrovires'
  | 'Sant Esteve de Palautordera'
  | 'Sant Esteve de la Sarga'
  | 'Sant Feliu Sasserra'
  | 'Sant Feliu de Buixalleu'
  | 'Sant Feliu de Codines'
  | 'Sant Feliu de Guíxols'
  | 'Sant Feliu de Llobregat'
  | 'Sant Feliu de Pallerols'
  | 'Sant Ferriol'
  | 'Sant Fost de Campsentelles'
  | 'Sant Fruitós de Bages'
  | 'Sant Gregori'
  | 'Sant Guim de Freixenet'
  | 'Sant Guim de la Plana'
  | 'Sant Hilari Sacalm'
  | 'Sant Hipòlit de Voltregà'
  | 'Sant Iscle de Vallalta'
  | "Sant Jaume d'Enveja"
  | 'Sant Jaume de Frontanyà'
  | 'Sant Jaume de Llierca'
  | 'Sant Jaume dels Domenys'
  | 'Sant Joan Despí'
  | 'Sant Joan de Mollet'
  | 'Sant Joan de Vilatorrada'
  | 'Sant Joan de les Abadesses'
  | 'Sant Joan les Fonts'
  | 'Sant Jordi Desvalls'
  | 'Sant Julià de Cerdanyola'
  | 'Sant Julià de Ramis'
  | 'Sant Julià de Vilatorta'
  | 'Sant Julià del Llor i Bonmatí'
  | 'Sant Just Desvern'
  | 'Sant Llorenç Savall'
  | "Sant Llorenç d'Hortons"
  | 'Sant Llorenç de Morunys'
  | 'Sant Llorenç de la Muga'
  | 'Sant Martí Sarroca'
  | 'Sant Martí Sesgueioles'
  | 'Sant Martí Vell'
  | "Sant Martí d'Albars"
  | 'Sant Martí de Centelles'
  | 'Sant Martí de Llémena'
  | 'Sant Martí de Riucorb'
  | 'Sant Martí de Tous'
  | 'Sant Mateu de Bages'
  | 'Sant Miquel de Campmajor'
  | 'Sant Miquel de Fluvià'
  | 'Sant Mori'
  | 'Sant Pau de Segúries'
  | 'Sant Pere Pescador'
  | 'Sant Pere Sallavinera'
  | 'Sant Pere de Ribes'
  | 'Sant Pere de Riudebitlles'
  | 'Sant Pere de Torelló'
  | 'Sant Pere de Vilamajor'
  | 'Sant Pol de Mar'
  | 'Sant Quintí de Mediona'
  | 'Sant Quirze Safaja'
  | 'Sant Quirze de Besora'
  | 'Sant Quirze del Vallès'
  | 'Sant Ramon'
  | "Sant Sadurní d'Anoia"
  | "Sant Sadurní d'Osormort"
  | 'Sant Salvador de Guardiola'
  | 'Sant Vicenç de Castellet'
  | 'Sant Vicenç de Montalt'
  | 'Sant Vicenç de Torelló'
  | 'Sant Vicenç dels Horts'
  | 'Santa Bàrbara'
  | 'Santa Cecília de Voltregà'
  | 'Santa Coloma de Cervelló'
  | 'Santa Coloma de Farners'
  | 'Santa Coloma de Gramenet'
  | 'Santa Coloma de Queralt'
  | "Santa Cristina d'Aro"
  | 'Santa Eugènia de Berga'
  | 'Santa Eulàlia de Riuprimer'
  | 'Santa Eulàlia de Ronçana'
  | 'Santa Fe del Penedès'
  | "Santa Llogaia d'Àlguema"
  | 'Santa Margarida de Montbui'
  | 'Santa Margarida i els Monjos'
  | "Santa Maria d'Oló"
  | 'Santa Maria de Besora'
  | 'Santa Maria de Martorelles'
  | 'Santa Maria de Merlès'
  | 'Santa Maria de Miralles'
  | 'Santa Maria de Palautordera'
  | 'Santa Oliva'
  | 'Santa Pau'
  | 'Santa Perpètua de Mogoda'
  | 'Santa Susanna'
  | 'Santpedor'
  | 'Sarral'
  | 'Sarrià de Ter'
  | 'Sarroca de Bellera'
  | 'Sarroca de Lleida'
  | 'Saus, Camallera i Llampaies'
  | 'Savallà del Comtat'
  | 'Senan'
  | 'Senterada'
  | 'Sentmenat'
  | 'Serinyà'
  | 'Serra de Daró'
  | 'Seròs'
  | 'Setcases'
  | 'Seva'
  | 'Sidamon'
  | 'Sils'
  | 'Sitges'
  | 'Siurana'
  | 'Sobremunt'
  | 'Solivella'
  | 'Solsona'
  | 'Sora'
  | 'Soriguera'
  | 'Sort'
  | 'Soses'
  | 'Subirats'
  | 'Sudanell'
  | 'Sunyer'
  | 'Susqueda'
  | 'Súria'
  | 'Tagamanent'
  | 'Talamanca'
  | 'Talarn'
  | 'Talavera'
  | 'Taradell'
  | 'Tarragona'
  | 'Tarroja de Segarra'
  | 'Tarrés'
  | 'Tavertet'
  | 'Tavèrnoles'
  | 'Teià'
  | 'Terrades'
  | 'Terrassa'
  | 'Terrassola i Lavit'
  | 'Tiana'
  | 'Tiurana'
  | 'Tivenys'
  | 'Tivissa'
  | 'Tona'
  | 'Tordera'
  | 'Torelló'
  | 'Tornabous'
  | 'Torre-serona'
  | 'Torrebesses'
  | 'Torredembarra'
  | 'Torrefarrera'
  | 'Torrefeta i Florejacs'
  | 'Torregrossa'
  | 'Torrelameu'
  | 'Torrelles de Foix'
  | 'Torrelles de Llobregat'
  | 'Torrent'
  | 'Torres de Segre'
  | 'Torroella de Fluvià'
  | 'Torroella de Montgrí'
  | 'Torroja del Priorat'
  | 'Tortellà'
  | 'Tortosa'
  | 'Torà'
  | 'Toses'
  | 'Tossa de Mar'
  | 'Tremp'
  | 'Tàrrega'
  | 'Térmens'
  | 'Tírvia'
  | 'Ullastrell'
  | 'Ullastret'
  | 'Ulldecona'
  | 'Ulldemolins'
  | 'Ullà'
  | 'Ultramort'
  | 'Urús'
  | 'Vacarisses'
  | 'Vall de Cardós'
  | 'Vall-llobrega'
  | "Vallbona d'Anoia"
  | 'Vallbona de les Monges'
  | 'Vallcebre'
  | 'Vallclara'
  | 'Vallfogona de Balaguer'
  | 'Vallfogona de Ripollès'
  | 'Vallfogona de Riucorb'
  | 'Vallgorguina'
  | 'Vallirana'
  | 'Vallmoll'
  | 'Vallromanes'
  | 'Valls'
  | "Vandellòs i l'Hospitalet de l'Infant"
  | 'Veciana'
  | 'Ventalló'
  | 'Verdú'
  | 'Verges'
  | 'Vespella de Gaià'
  | 'Vic'
  | 'Vidreres'
  | 'Vidrà'
  | 'Vielha e Mijaran'
  | 'Vila-rodona'
  | 'Vila-sacra'
  | 'Vila-sana'
  | 'Vila-seca'
  | 'Vilabella'
  | 'Vilabertran'
  | 'Vilablareix'
  | 'Vilada'
  | 'Viladamat'
  | 'Viladasens'
  | 'Viladecans'
  | 'Viladecavalls'
  | 'Vilademuls'
  | 'Viladrau'
  | 'Vilafant'
  | 'Vilafranca del Penedès'
  | 'Vilagrassa'
  | 'Vilajuïga'
  | 'Vilalba Sasserra'
  | 'Vilalba dels Arcs'
  | 'Vilaller'
  | 'Vilallonga de Ter'
  | 'Vilallonga del Camp'
  | 'Vilamacolum'
  | 'Vilamalla'
  | 'Vilamaniscle'
  | 'Vilamòs'
  | 'Vilanant'
  | "Vilanova d'Escornalbou"
  | 'Vilanova de Bellpuig'
  | 'Vilanova de Meià'
  | 'Vilanova de Prades'
  | 'Vilanova de Sau'
  | 'Vilanova de Segrià'
  | "Vilanova de l'Aguda"
  | 'Vilanova de la Barca'
  | 'Vilanova del Camí'
  | 'Vilanova del Vallès'
  | 'Vilanova i la Geltrú'
  | 'Vilaplana'
  | 'Vilassar de Dalt'
  | 'Vilassar de Mar'
  | 'Vilaverd'
  | 'Vilaür'
  | "Vilobí d'Onyar"
  | 'Vilobí del Penedès'
  | 'Vilopriu'
  | 'Vimbodí i Poblet'
  | 'Vinaixa'
  | 'Vinebre'
  | 'Vinyols i els Arcs'
  | 'Viver i Serrateix'
  | 'Vulpellac, Fonteta i Peratallada'
  | 'Xerta'
  | 'el Bruc'
  | 'el Brull'
  | 'el Catllar'
  | 'el Cogul'
  | "el Far d'Empordà"
  | 'el Figueró i Montmany'
  | 'el Lloar'
  | 'el Masnou'
  | 'el Masroig'
  | 'el Milà'
  | 'el Molar'
  | 'el Montmell'
  | 'el Morell'
  | "el Palau d'Anglesola"
  | 'el Papiol'
  | 'el Perelló'
  | 'el Pinell de Brai'
  | 'el Pla de Santa Maria'
  | 'el Pla del Penedès'
  | 'el Poal'
  | "el Pont d'Armentera"
  | 'el Pont de Bar'
  | 'el Pont de Suert'
  | 'el Pont de Vilomara i Rocafort'
  | 'el Port de la Selva'
  | 'el Prat de Llobregat'
  | 'el Rourell'
  | 'el Soleràs'
  | 'el Vendrell'
  | 'el Vilosell'
  | 'els Alamús'
  | 'els Garidells'
  | 'els Guiamets'
  | 'els Hostalets de Pierola'
  | 'els Omellons'
  | 'els Omells de na Gaia'
  | 'els Pallaresos'
  | 'els Plans de Sió'
  | 'els Prats de Rei'
  | 'els Torms'
  | "l'Albagés"
  | "l'Albi"
  | "l'Albiol"
  | "l'Aldea"
  | "l'Aleixar"
  | "l'Ametlla de Mar"
  | "l'Ametlla del Vallès"
  | "l'Ampolla"
  | "l'Arboç"
  | "l'Argentera"
  | "l'Armentera"
  | "l'Escala"
  | "l'Espluga Calba"
  | "l'Espluga de Francolí"
  | "l'Espunyola"
  | "l'Esquirol"
  | "l'Estany"
  | "l'Hospitalet de Llobregat"
  | 'la Baronia de Rialb'
  | "la Bisbal d'Empordà"
  | 'la Bisbal de Montsant'
  | 'la Bisbal del Penedès'
  | 'la Canonja'
  | 'la Cellera de Ter'
  | 'la Coma i la Pedra'
  | 'la Fatarella'
  | 'la Febró'
  | 'la Figuera'
  | 'la Floresta'
  | 'la Fuliola'
  | 'la Galera'
  | 'la Garriga'
  | 'la Granada'
  | 'la Granadella'
  | "la Granja d'Escarp"
  | "la Guingueta d'Àneu"
  | 'la Jonquera'
  | 'la Llacuna'
  | 'la Llagosta'
  | 'la Masó'
  | 'la Molsosa'
  | 'la Morera de Montsant'
  | 'la Nou de Berguedà'
  | 'la Nou de Gaià'
  | "la Palma d'Ebre"
  | 'la Palma de Cervelló'
  | 'la Pera'
  | 'la Pobla de Claramunt'
  | 'la Pobla de Cérvoles'
  | 'la Pobla de Lillet'
  | 'la Pobla de Mafumet'
  | 'la Pobla de Massaluca'
  | 'la Pobla de Montornès'
  | 'la Pobla de Segur'
  | 'la Portella'
  | 'la Quar'
  | 'la Riba'
  | 'la Riera de Gaià'
  | 'la Roca del Vallès'
  | 'la Ràpita'
  | 'la Secuita'
  | 'la Selva de Mar'
  | 'la Selva del Camp'
  | 'la Sentiu de Sió'
  | "la Seu d'Urgell"
  | 'la Sénia'
  | "la Tallada d'Empordà"
  | 'la Torre de Cabdella'
  | 'la Torre de Claramunt'
  | 'la Torre de Fontaubella'
  | "la Torre de l'Espanyol"
  | 'la Vajol'
  | "la Vall d'en Bas"
  | 'la Vall de Bianya'
  | 'la Vall de Boí'
  | 'la Vansa i Fórnols'
  | 'la Vilella Alta'
  | 'la Vilella Baixa'
  | 'les Avellanes i Santa Linya'
  | 'les Borges Blanques'
  | 'les Borges del Camp'
  | 'les Cabanyes'
  | 'les Franqueses del Vallès'
  | 'les Llosses'
  | 'les Masies de Roda'
  | 'les Masies de Voltregà'
  | 'les Oluges'
  | 'les Piles'
  | "les Planes d'Hostoles"
  | 'les Preses'
  | "les Valls d'Aguilar"
  | 'les Valls de Valira'
  | 'Àger'
  | 'Òdena'
  | 'Òrrius';

export const regionToProvince: Record<Region, Province> = {
  'alt-camp': 'tarragona',
  'alt-emporda': 'girona',
  'alt-penedes': 'barcelona',
  'alt-urgell': 'lleida',
  'alta-ribagorca': 'lleida',
  anoia: 'barcelona',
  aran: 'lleida',
  bages: 'barcelona',
  'baix-camp': 'tarragona',
  'baix-ebre': 'tarragona',
  'baix-emporda': 'girona',
  'baix-llobregat': 'barcelona',
  'baix-penedes': 'tarragona',
  barcelones: 'barcelona',
  bergueda: 'barcelona',
  cerdanya: 'girona',
  'conca-de-barbera': 'tarragona',
  garraf: 'barcelona',
  garrigues: 'lleida',
  garrotxa: 'girona',
  girones: 'girona',
  llucanes: 'barcelona',
  maresme: 'barcelona',
  moianes: 'barcelona',
  montsia: 'tarragona',
  noguera: 'lleida',
  osona: 'barcelona',
  'pallars-jussa': 'lleida',
  'pallars-sobira': 'lleida',
  'pla-de-lestany': 'girona',
  'pla-durgell': 'lleida',
  priorat: 'tarragona',
  'ribera-debre': 'tarragona',
  ripolles: 'girona',
  segarra: 'lleida',
  segria: 'lleida',
  selva: 'girona',
  solsones: 'lleida',
  tarragones: 'tarragona',
  'terra-alta': 'tarragona',
  urgell: 'lleida',
  'valles-occidental': 'barcelona',
  'valles-oriental': 'barcelona',
};
export const municipalityToRegion: Record<Municipality, Region> = {
  'Abella de la Conca': 'pallars-jussa',
  Abrera: 'baix-llobregat',
  Agramunt: 'urgell',
  'Aguilar de Segarra': 'bages',
  Agullana: 'alt-emporda',
  Aiguafreda: 'valles-oriental',
  Aiguamúrcia: 'alt-camp',
  Aiguaviva: 'girones',
  Aitona: 'segria',
  Albanyà: 'alt-emporda',
  Albatàrrec: 'segria',
  Albesa: 'noguera',
  Albinyana: 'baix-penedes',
  Albons: 'baix-emporda',
  Alcanar: 'montsia',
  Alcanó: 'segria',
  Alcarràs: 'segria',
  Alcoletge: 'segria',
  Alcover: 'alt-camp',
  Aldover: 'baix-ebre',
  Alella: 'maresme',
  'Alfara de Carles': 'baix-ebre',
  Alfarràs: 'segria',
  Alforja: 'baix-camp',
  Alfés: 'segria',
  Algerri: 'noguera',
  Alguaire: 'segria',
  Alins: 'pallars-sobira',
  Alió: 'alt-camp',
  Almacelles: 'segria',
  Almatret: 'segria',
  Almenar: 'segria',
  Almoster: 'baix-camp',
  Alp: 'cerdanya',
  Alpens: 'llucanes',
  Alpicat: 'segria',
  'Alt Àneu': 'pallars-sobira',
  Altafulla: 'tarragones',
  'Alàs i Cerc': 'alt-urgell',
  'Alòs de Balaguer': 'noguera',
  Amer: 'selva',
  Amposta: 'montsia',
  Anglesola: 'urgell',
  Anglès: 'selva',
  Arbeca: 'garrigues',
  Arbolí: 'baix-camp',
  Arbúcies: 'selva',
  'Arenys de Mar': 'maresme',
  'Arenys de Munt': 'maresme',
  Argelaguer: 'garrotxa',
  Argentona: 'maresme',
  Argençola: 'anoia',
  Arnes: 'terra-alta',
  Arres: 'aran',
  Arsèguel: 'alt-urgell',
  'Artesa de Lleida': 'segria',
  'Artesa de Segre': 'noguera',
  Artés: 'bages',
  Ascó: 'ribera-debre',
  Aspa: 'segria',
  'Avinyonet de Puigventós': 'alt-emporda',
  'Avinyonet del Penedès': 'alt-penedes',
  Avinyó: 'bages',
  Avià: 'bergueda',
  Badalona: 'barcelones',
  'Badia del Vallès': 'valles-occidental',
  Bagà: 'bergueda',
  'Baix Pallars': 'pallars-sobira',
  Balaguer: 'noguera',
  Balenyà: 'osona',
  Balsareny: 'bages',
  'Banyeres del Penedès': 'baix-penedes',
  Banyoles: 'pla-de-lestany',
  Barbens: 'pla-durgell',
  'Barberà de la Conca': 'conca-de-barbera',
  'Barberà del Vallès': 'valles-occidental',
  Barcelona: 'barcelones',
  Bassella: 'alt-urgell',
  Batea: 'terra-alta',
  Bausen: 'aran',
  Begues: 'baix-llobregat',
  Begur: 'baix-emporda',
  Belianes: 'urgell',
  "Bell-lloc d'Urgell": 'pla-durgell',
  Bellaguarda: 'garrigues',
  "Bellcaire d'Empordà": 'baix-emporda',
  "Bellcaire d'Urgell": 'noguera',
  "Bellmunt d'Urgell": 'noguera',
  'Bellmunt del Priorat': 'priorat',
  Bellprat: 'anoia',
  Bellpuig: 'urgell',
  Bellvei: 'baix-penedes',
  'Bellver de Cerdanya': 'cerdanya',
  Bellvís: 'pla-durgell',
  'Benavent de Segrià': 'segria',
  Benifallet: 'baix-ebre',
  Benissanet: 'ribera-debre',
  Berga: 'bergueda',
  Besalú: 'garrotxa',
  Bescanó: 'girones',
  Beuda: 'garrotxa',
  'Bigues i Riells del Fai': 'valles-oriental',
  Biosca: 'solsones',
  Biure: 'alt-emporda',
  Blancafort: 'conca-de-barbera',
  Blanes: 'selva',
  'Boadella i les Escaules': 'alt-emporda',
  Bolvir: 'cerdanya',
  Bonastre: 'baix-penedes',
  Bordils: 'girones',
  Borrassà: 'alt-emporda',
  Borredà: 'bergueda',
  Bossòst: 'aran',
  Bot: 'terra-alta',
  Botarell: 'baix-camp',
  Bovera: 'garrigues',
  Breda: 'selva',
  'Brunyola i Sant Martí Sapresa': 'selva',
  Bràfim: 'alt-camp',
  Bàscara: 'alt-emporda',
  Cabanabona: 'noguera',
  Cabanelles: 'alt-emporda',
  Cabanes: 'alt-emporda',
  Cabassers: 'priorat',
  'Cabra del Camp': 'alt-camp',
  "Cabrera d'Anoia": 'anoia',
  'Cabrera de Mar': 'maresme',
  Cabrils: 'maresme',
  Cabó: 'alt-urgell',
  Cadaqués: 'alt-emporda',
  Calaf: 'anoia',
  Calafell: 'baix-penedes',
  Calders: 'moianes',
  "Caldes d'Estrac": 'maresme',
  'Caldes de Malavella': 'selva',
  'Caldes de Montbui': 'valles-oriental',
  Calella: 'maresme',
  Calldetenes: 'osona',
  Callús: 'bages',
  'Calonge de Segarra': 'anoia',
  'Calonge i Sant Antoni': 'baix-emporda',
  Camarasa: 'noguera',
  Camarles: 'baix-ebre',
  Cambrils: 'baix-camp',
  Campdevànol: 'ripolles',
  Campelles: 'ripolles',
  Campins: 'valles-oriental',
  Campllong: 'girones',
  Campmany: 'alt-emporda',
  Camprodon: 'ripolles',
  Camós: 'pla-de-lestany',
  Canejan: 'aran',
  "Canet d'Adri": 'girones',
  'Canet de Mar': 'maresme',
  Canovelles: 'valles-oriental',
  Cantallops: 'alt-emporda',
  Canyelles: 'garraf',
  Capafonts: 'baix-camp',
  Capellades: 'anoia',
  Capolat: 'bergueda',
  Capçanes: 'priorat',
  Cardedeu: 'valles-oriental',
  Cardona: 'bages',
  Carme: 'anoia',
  Caseres: 'terra-alta',
  Casserres: 'bergueda',
  'Cassà de la Selva': 'girones',
  "Castell d'Aro, Platja d'Aro i s'Agaró": 'baix-emporda',
  'Castell de Mur': 'pallars-jussa',
  "Castell de l'Areny": 'bergueda',
  'Castellar de la Ribera': 'solsones',
  "Castellar de n'Hug": 'bergueda',
  'Castellar del Riu': 'bergueda',
  'Castellar del Vallès': 'valles-occidental',
  'Castellbell i el Vilar': 'bages',
  Castellbisbal: 'valles-occidental',
  Castellcir: 'moianes',
  Castelldans: 'garrigues',
  Castelldefels: 'baix-llobregat',
  'Castellet i la Gornal': 'alt-penedes',
  'Castellfollit de Riubregós': 'anoia',
  'Castellfollit de la Roca': 'garrotxa',
  'Castellfollit del Boix': 'bages',
  Castellgalí: 'bages',
  'Castellnou de Bages': 'bages',
  'Castellnou de Seana': 'pla-durgell',
  Castellolí: 'anoia',
  Castellserà: 'urgell',
  Castellterçol: 'moianes',
  'Castellvell del Camp': 'baix-camp',
  'Castellví de Rosanes': 'baix-llobregat',
  'Castellví de la Marca': 'alt-penedes',
  "Castelló d'Empúries": 'alt-emporda',
  'Castelló de Farfanya': 'noguera',
  Cava: 'alt-urgell',
  Celrà: 'girones',
  Centelles: 'osona',
  Cercs: 'bergueda',
  'Cerdanyola del Vallès': 'valles-occidental',
  Cervelló: 'baix-llobregat',
  Cervera: 'segarra',
  'Cervià de Ter': 'girones',
  'Cervià de les Garrigues': 'garrigues',
  Cistella: 'alt-emporda',
  Ciutadilla: 'urgell',
  'Clariana de Cardener': 'solsones',
  Colera: 'alt-emporda',
  'Coll de Nargó': 'alt-urgell',
  Collbató: 'baix-llobregat',
  Colldejou: 'baix-camp',
  Collsuspina: 'moianes',
  Colomers: 'baix-emporda',
  'Conca de Dalt': 'pallars-jussa',
  Conesa: 'conca-de-barbera',
  Constantí: 'tarragones',
  Copons: 'anoia',
  "Corbera d'Ebre": 'terra-alta',
  'Corbera de Llobregat': 'baix-llobregat',
  Corbins: 'segria',
  'Cornellà de Llobregat': 'baix-llobregat',
  'Cornellà del Terri': 'pla-de-lestany',
  'Cornudella de Montsant': 'priorat',
  Corçà: 'baix-emporda',
  Creixell: 'tarragones',
  Crespià: 'pla-de-lestany',
  "Cruïlles, Monells i Sant Sadurní de l'Heura": 'baix-emporda',
  Cubelles: 'garraf',
  Cubells: 'noguera',
  Cunit: 'baix-penedes',
  'Cànoves i Samalús': 'valles-oriental',
  Darnius: 'alt-emporda',
  Das: 'cerdanya',
  Deltebre: 'baix-ebre',
  Dosrius: 'maresme',
  Duesaigües: 'baix-camp',
  'Es Bòrdes': 'aran',
  Esparreguera: 'baix-llobregat',
  Espinelves: 'osona',
  'Esplugues de Llobregat': 'baix-llobregat',
  Espolla: 'alt-emporda',
  Esponellà: 'pla-de-lestany',
  Espot: 'pallars-sobira',
  Estamariu: 'alt-urgell',
  Estaràs: 'segarra',
  "Esterri d'Àneu": 'pallars-sobira',
  'Esterri de Cardós': 'pallars-sobira',
  Falset: 'priorat',
  Farrera: 'pallars-sobira',
  Figueres: 'alt-emporda',
  'Figuerola del Camp': 'alt-camp',
  Flaçà: 'girones',
  Flix: 'ribera-debre',
  'Fogars de Montclús': 'valles-oriental',
  'Fogars de la Selva': 'selva',
  Foixà: 'baix-emporda',
  Folgueroles: 'osona',
  Fondarella: 'pla-durgell',
  Fonollosa: 'bages',
  'Font-rubí': 'alt-penedes',
  'Fontanals de Cerdanya': 'cerdanya',
  Fontanilles: 'baix-emporda',
  Fontcoberta: 'pla-de-lestany',
  Foradada: 'noguera',
  'Fornells de la Selva': 'girones',
  Fortià: 'alt-emporda',
  Forès: 'conca-de-barbera',
  Freginals: 'montsia',
  Fulleda: 'garrigues',
  Fígols: 'bergueda',
  'Fígols i Alinyà': 'alt-urgell',
  Gaià: 'bages',
  Gallifa: 'valles-occidental',
  Gandesa: 'terra-alta',
  Garcia: 'ribera-debre',
  Garrigoles: 'baix-emporda',
  Garriguella: 'alt-emporda',
  Garrigàs: 'alt-emporda',
  'Gavet de la Conca': 'pallars-jussa',
  Gavà: 'baix-llobregat',
  Gelida: 'alt-penedes',
  Ger: 'cerdanya',
  'Gimenells i el Pla de la Font': 'segria',
  Ginestar: 'ribera-debre',
  Girona: 'girones',
  Gironella: 'bergueda',
  Gisclareny: 'bergueda',
  Godall: 'montsia',
  Golmés: 'pla-durgell',
  Gombrèn: 'ripolles',
  Granera: 'moianes',
  Granollers: 'valles-oriental',
  Granyanella: 'segarra',
  'Granyena de Segarra': 'segarra',
  'Granyena de les Garrigues': 'garrigues',
  Gratallops: 'priorat',
  Gualba: 'valles-oriental',
  Gualta: 'baix-emporda',
  'Guardiola de Berguedà': 'bergueda',
  'Guils de Cerdanya': 'cerdanya',
  Guimerà: 'urgell',
  Guissona: 'segarra',
  Guixers: 'solsones',
  Gurb: 'osona',
  Gósol: 'bergueda',
  'Horta de Sant Joan': 'terra-alta',
  Hostalric: 'selva',
  Igualada: 'anoia',
  'Isona i Conca Dellà': 'pallars-jussa',
  Isòvol: 'cerdanya',
  "Ivars d'Urgell": 'pla-durgell',
  'Ivars de Noguera': 'noguera',
  Ivorra: 'segarra',
  Jafre: 'baix-emporda',
  Jorba: 'anoia',
  'Josa i Tuixén': 'alt-urgell',
  Juià: 'girones',
  Juncosa: 'garrigues',
  Juneda: 'garrigues',
  Les: 'aran',
  Linyola: 'pla-durgell',
  Lladorre: 'pallars-sobira',
  Lladurs: 'solsones',
  Llagostera: 'girones',
  Llambilles: 'girones',
  Llanars: 'ripolles',
  Llançà: 'alt-emporda',
  Llardecans: 'segria',
  Llavorsí: 'pallars-sobira',
  Lledó: 'alt-emporda',
  Lleida: 'segria',
  Llers: 'alt-emporda',
  'Lles de Cerdanya': 'cerdanya',
  Llimiana: 'pallars-jussa',
  'Llinars del Vallès': 'valles-oriental',
  "Lliçà d'Amunt": 'valles-oriental',
  'Lliçà de Vall': 'valles-oriental',
  Llobera: 'solsones',
  Llorac: 'conca-de-barbera',
  'Llorenç del Penedès': 'baix-penedes',
  'Lloret de Mar': 'selva',
  Lluçà: 'llucanes',
  Llívia: 'cerdanya',
  Madremanya: 'girones',
  Maials: 'segria',
  'Maià de Montcal': 'garrotxa',
  Maldà: 'urgell',
  'Malgrat de Mar': 'maresme',
  Malla: 'osona',
  Manlleu: 'osona',
  Manresa: 'bages',
  Margalef: 'priorat',
  Marganell: 'bages',
  Martorell: 'baix-llobregat',
  Martorelles: 'valles-oriental',
  Marçà: 'priorat',
  'Mas de Barberans': 'montsia',
  'Masarac i Vilarnadal': 'alt-emporda',
  Masdenverge: 'montsia',
  Masllorenç: 'baix-penedes',
  Maspujols: 'baix-camp',
  Masquefa: 'anoia',
  Massalcoreig: 'segria',
  Massoteres: 'segarra',
  Matadepera: 'valles-occidental',
  Mataró: 'maresme',
  Maçanes: 'selva',
  'Maçanet de Cabrenys': 'alt-emporda',
  'Maçanet de la Selva': 'selva',
  Mediona: 'alt-penedes',
  Menàrguens: 'noguera',
  Meranges: 'cerdanya',
  Mieres: 'garrotxa',
  Miralcamp: 'pla-durgell',
  Miravet: 'ribera-debre',
  Moià: 'moianes',
  'Molins de Rei': 'baix-llobregat',
  Mollerussa: 'pla-durgell',
  'Mollet de Peralada': 'alt-emporda',
  'Mollet del Vallès': 'valles-oriental',
  Molló: 'ripolles',
  'Monistrol de Calders': 'moianes',
  'Monistrol de Montserrat': 'bages',
  'Mont-ral': 'alt-camp',
  'Mont-ras': 'baix-emporda',
  'Mont-roig del Camp': 'baix-camp',
  'Montagut i Oix': 'garrotxa',
  Montblanc: 'conca-de-barbera',
  'Montbrió del Camp': 'baix-camp',
  'Montcada i Reixac': 'valles-occidental',
  Montclar: 'bergueda',
  'Montellà i Martinet': 'cerdanya',
  Montesquiu: 'osona',
  'Montferrer i Castellbò': 'alt-urgell',
  Montferri: 'alt-camp',
  Montgai: 'noguera',
  Montgat: 'maresme',
  Montmajor: 'bergueda',
  Montmaneu: 'anoia',
  Montmeló: 'valles-oriental',
  'Montoliu de Lleida': 'segria',
  'Montoliu de Segarra': 'segarra',
  'Montornès de Segarra': 'segarra',
  'Montornès del Vallès': 'valles-oriental',
  Montseny: 'valles-oriental',
  Muntanyola: 'osona',
  Mura: 'bages',
  "Móra d'Ebre": 'ribera-debre',
  'Móra la Nova': 'ribera-debre',
  Nalec: 'urgell',
  'Naut Aran': 'aran',
  Navarcles: 'bages',
  Navars: 'bages',
  Navata: 'alt-emporda',
  Navès: 'solsones',
  Nulles: 'alt-camp',
  Odèn: 'solsones',
  Ogassa: 'ripolles',
  'Olesa de Bonesvalls': 'alt-penedes',
  'Olesa de Montserrat': 'baix-llobregat',
  Oliana: 'alt-urgell',
  Oliola: 'noguera',
  Olius: 'solsones',
  Olivella: 'garraf',
  Olost: 'llucanes',
  Olot: 'garrotxa',
  Olvan: 'bergueda',
  Olèrdola: 'alt-penedes',
  Ordis: 'alt-emporda',
  Organyà: 'alt-urgell',
  Oristà: 'llucanes',
  Orpí: 'anoia',
  Orís: 'osona',
  'Os de Balaguer': 'noguera',
  Osor: 'selva',
  'Ossó de Sió': 'urgell',
  'Pacs del Penedès': 'alt-penedes',
  Palafolls: 'maresme',
  Palafrugell: 'baix-emporda',
  Palamós: 'baix-emporda',
  'Palau de Santa Eulàlia': 'alt-emporda',
  'Palau-sator': 'baix-emporda',
  'Palau-saverdera': 'alt-emporda',
  'Palau-solità i Plegamans': 'valles-occidental',
  Pallejà: 'baix-llobregat',
  'Palol de Revardit': 'pla-de-lestany',
  Pals: 'baix-emporda',
  Pardines: 'ripolles',
  'Parets del Vallès': 'valles-oriental',
  Parlavà: 'baix-emporda',
  'Passanant i Belltall': 'conca-de-barbera',
  Pau: 'alt-emporda',
  Paüls: 'baix-ebre',
  'Pedret i Marzà': 'alt-emporda',
  Penelles: 'noguera',
  Perafita: 'llucanes',
  Perafort: 'tarragones',
  Peralada: 'alt-emporda',
  Peramola: 'alt-urgell',
  Piera: 'anoia',
  'Pineda de Mar': 'maresme',
  'Pinell de Solsonès': 'solsones',
  Pinós: 'solsones',
  Pira: 'conca-de-barbera',
  Planoles: 'ripolles',
  Poboleda: 'priorat',
  Polinyà: 'valles-occidental',
  'Pont de Molins': 'alt-emporda',
  Pontils: 'conca-de-barbera',
  Pontons: 'alt-penedes',
  Ponts: 'noguera',
  Pontós: 'alt-emporda',
  Porqueres: 'pla-de-lestany',
  Porrera: 'priorat',
  Portbou: 'alt-emporda',
  'Pradell de la Teixeta': 'priorat',
  Prades: 'baix-camp',
  'Prat de Comte': 'terra-alta',
  Pratdip: 'baix-camp',
  'Prats de Lluçanès': 'llucanes',
  'Prats i Sansor': 'cerdanya',
  Preixana: 'urgell',
  Preixens: 'noguera',
  'Premià de Dalt': 'maresme',
  'Premià de Mar': 'maresme',
  Prullans: 'cerdanya',
  'Puig-reig': 'bergueda',
  Puigcerdà: 'cerdanya',
  Puigdàlber: 'alt-penedes',
  Puiggròs: 'garrigues',
  Puigpelat: 'alt-camp',
  "Puigverd d'Agramunt": 'urgell',
  'Puigverd de Lleida': 'segria',
  Pujalt: 'anoia',
  Quart: 'girones',
  Queralbs: 'ripolles',
  Querol: 'alt-camp',
  Rabós: 'alt-emporda',
  Rajadell: 'bages',
  Rasquera: 'ribera-debre',
  Regencós: 'baix-emporda',
  Rellinars: 'valles-occidental',
  Renau: 'tarragones',
  Reus: 'baix-camp',
  Rialb: 'pallars-sobira',
  "Riba-roja d'Ebre": 'ribera-debre',
  "Ribera d'Ondara": 'segarra',
  "Ribera d'Urgellet": 'alt-urgell',
  'Ribes de Freser': 'ripolles',
  'Riells i Viabrea': 'selva',
  Riner: 'solsones',
  Ripoll: 'ripolles',
  Ripollet: 'valles-occidental',
  'Riu de Cerdanya': 'cerdanya',
  Riudarenes: 'selva',
  Riudaura: 'garrotxa',
  Riudecanyes: 'baix-camp',
  Riudecols: 'baix-camp',
  'Riudellots de la Selva': 'selva',
  Riudoms: 'baix-camp',
  Riumors: 'alt-emporda',
  'Rocafort de Queralt': 'conca-de-barbera',
  'Roda de Berà': 'tarragones',
  'Roda de Ter': 'osona',
  Rodonyà: 'alt-camp',
  Roquetes: 'baix-ebre',
  Roses: 'alt-emporda',
  Rosselló: 'segria',
  Rubió: 'anoia',
  Rubí: 'valles-occidental',
  'Rupit i Pruit': 'osona',
  Rupià: 'baix-emporda',
  Sabadell: 'valles-occidental',
  Sagàs: 'bergueda',
  Saldes: 'bergueda',
  'Sales de Llierca': 'garrotxa',
  Sallent: 'bages',
  Salomó: 'tarragones',
  Salou: 'tarragones',
  Salt: 'girones',
  'Salàs de Pallars': 'pallars-jussa',
  Sanaüja: 'segarra',
  'Sant Adrià de Besòs': 'barcelones',
  'Sant Agustí de Lluçanès': 'osona',
  'Sant Andreu Salou': 'girones',
  'Sant Andreu de Llavaneres': 'maresme',
  'Sant Andreu de la Barca': 'baix-llobregat',
  'Sant Aniol de Finestres': 'garrotxa',
  'Sant Antoni de Vilamajor': 'valles-oriental',
  'Sant Bartomeu del Grau': 'osona',
  'Sant Boi de Llobregat': 'baix-llobregat',
  'Sant Boi de Lluçanès': 'osona',
  'Sant Cebrià de Vallalta': 'maresme',
  'Sant Celoni': 'valles-oriental',
  'Sant Climent Sescebes': 'alt-emporda',
  'Sant Climent de Llobregat': 'baix-llobregat',
  'Sant Cugat Sesgarrigues': 'alt-penedes',
  'Sant Cugat del Vallès': 'valles-occidental',
  'Sant Esteve Sesrovires': 'baix-llobregat',
  'Sant Esteve de Palautordera': 'valles-oriental',
  'Sant Esteve de la Sarga': 'pallars-jussa',
  'Sant Feliu Sasserra': 'bages',
  'Sant Feliu de Buixalleu': 'selva',
  'Sant Feliu de Codines': 'valles-oriental',
  'Sant Feliu de Guíxols': 'baix-emporda',
  'Sant Feliu de Llobregat': 'baix-llobregat',
  'Sant Feliu de Pallerols': 'garrotxa',
  'Sant Ferriol': 'garrotxa',
  'Sant Fost de Campsentelles': 'valles-oriental',
  'Sant Fruitós de Bages': 'bages',
  'Sant Gregori': 'girones',
  'Sant Guim de Freixenet': 'segarra',
  'Sant Guim de la Plana': 'segarra',
  'Sant Hilari Sacalm': 'selva',
  'Sant Hipòlit de Voltregà': 'osona',
  'Sant Iscle de Vallalta': 'maresme',
  "Sant Jaume d'Enveja": 'montsia',
  'Sant Jaume de Frontanyà': 'bergueda',
  'Sant Jaume de Llierca': 'garrotxa',
  'Sant Jaume dels Domenys': 'baix-penedes',
  'Sant Joan Despí': 'baix-llobregat',
  'Sant Joan de Mollet': 'girones',
  'Sant Joan de Vilatorrada': 'bages',
  'Sant Joan de les Abadesses': 'ripolles',
  'Sant Joan les Fonts': 'garrotxa',
  'Sant Jordi Desvalls': 'girones',
  'Sant Julià de Cerdanyola': 'bergueda',
  'Sant Julià de Ramis': 'girones',
  'Sant Julià de Vilatorta': 'osona',
  'Sant Julià del Llor i Bonmatí': 'selva',
  'Sant Just Desvern': 'baix-llobregat',
  'Sant Llorenç Savall': 'valles-occidental',
  "Sant Llorenç d'Hortons": 'alt-penedes',
  'Sant Llorenç de Morunys': 'solsones',
  'Sant Llorenç de la Muga': 'alt-emporda',
  'Sant Martí Sarroca': 'alt-penedes',
  'Sant Martí Sesgueioles': 'anoia',
  'Sant Martí Vell': 'girones',
  "Sant Martí d'Albars": 'llucanes',
  'Sant Martí de Centelles': 'osona',
  'Sant Martí de Llémena': 'girones',
  'Sant Martí de Riucorb': 'urgell',
  'Sant Martí de Tous': 'anoia',
  'Sant Mateu de Bages': 'bages',
  'Sant Miquel de Campmajor': 'pla-de-lestany',
  'Sant Miquel de Fluvià': 'alt-emporda',
  'Sant Mori': 'alt-emporda',
  'Sant Pau de Segúries': 'ripolles',
  'Sant Pere Pescador': 'alt-emporda',
  'Sant Pere Sallavinera': 'anoia',
  'Sant Pere de Ribes': 'garraf',
  'Sant Pere de Riudebitlles': 'alt-penedes',
  'Sant Pere de Torelló': 'osona',
  'Sant Pere de Vilamajor': 'valles-oriental',
  'Sant Pol de Mar': 'maresme',
  'Sant Quintí de Mediona': 'alt-penedes',
  'Sant Quirze Safaja': 'moianes',
  'Sant Quirze de Besora': 'osona',
  'Sant Quirze del Vallès': 'valles-occidental',
  'Sant Ramon': 'segarra',
  "Sant Sadurní d'Anoia": 'alt-penedes',
  "Sant Sadurní d'Osormort": 'osona',
  'Sant Salvador de Guardiola': 'bages',
  'Sant Vicenç de Castellet': 'bages',
  'Sant Vicenç de Montalt': 'maresme',
  'Sant Vicenç de Torelló': 'osona',
  'Sant Vicenç dels Horts': 'baix-llobregat',
  'Santa Bàrbara': 'montsia',
  'Santa Cecília de Voltregà': 'osona',
  'Santa Coloma de Cervelló': 'baix-llobregat',
  'Santa Coloma de Farners': 'selva',
  'Santa Coloma de Gramenet': 'barcelones',
  'Santa Coloma de Queralt': 'conca-de-barbera',
  "Santa Cristina d'Aro": 'baix-emporda',
  'Santa Eugènia de Berga': 'osona',
  'Santa Eulàlia de Riuprimer': 'osona',
  'Santa Eulàlia de Ronçana': 'valles-oriental',
  'Santa Fe del Penedès': 'alt-penedes',
  "Santa Llogaia d'Àlguema": 'alt-emporda',
  'Santa Margarida de Montbui': 'anoia',
  'Santa Margarida i els Monjos': 'alt-penedes',
  "Santa Maria d'Oló": 'moianes',
  'Santa Maria de Besora': 'osona',
  'Santa Maria de Martorelles': 'valles-oriental',
  'Santa Maria de Merlès': 'bergueda',
  'Santa Maria de Miralles': 'anoia',
  'Santa Maria de Palautordera': 'valles-oriental',
  'Santa Oliva': 'baix-penedes',
  'Santa Pau': 'garrotxa',
  'Santa Perpètua de Mogoda': 'valles-occidental',
  'Santa Susanna': 'maresme',
  Santpedor: 'bages',
  Sarral: 'conca-de-barbera',
  'Sarrià de Ter': 'girones',
  'Sarroca de Bellera': 'pallars-jussa',
  'Sarroca de Lleida': 'segria',
  'Saus, Camallera i Llampaies': 'alt-emporda',
  'Savallà del Comtat': 'conca-de-barbera',
  Senan: 'conca-de-barbera',
  Senterada: 'pallars-jussa',
  Sentmenat: 'valles-occidental',
  Serinyà: 'pla-de-lestany',
  'Serra de Daró': 'baix-emporda',
  Seròs: 'segria',
  Setcases: 'ripolles',
  Seva: 'osona',
  Sidamon: 'pla-durgell',
  Sils: 'selva',
  Sitges: 'garraf',
  Siurana: 'alt-emporda',
  Sobremunt: 'llucanes',
  Solivella: 'conca-de-barbera',
  Solsona: 'solsones',
  Sora: 'osona',
  Soriguera: 'pallars-sobira',
  Sort: 'pallars-sobira',
  Soses: 'segria',
  Subirats: 'alt-penedes',
  Sudanell: 'segria',
  Sunyer: 'segria',
  Susqueda: 'selva',
  Súria: 'bages',
  Tagamanent: 'valles-oriental',
  Talamanca: 'bages',
  Talarn: 'pallars-jussa',
  Talavera: 'segarra',
  Taradell: 'osona',
  Tarragona: 'tarragones',
  'Tarroja de Segarra': 'segarra',
  Tarrés: 'garrigues',
  Tavertet: 'osona',
  Tavèrnoles: 'osona',
  Teià: 'maresme',
  Terrades: 'alt-emporda',
  Terrassa: 'valles-occidental',
  'Terrassola i Lavit': 'alt-penedes',
  Tiana: 'maresme',
  Tiurana: 'noguera',
  Tivenys: 'baix-ebre',
  Tivissa: 'ribera-debre',
  Tona: 'osona',
  Tordera: 'maresme',
  Torelló: 'osona',
  Tornabous: 'urgell',
  'Torre-serona': 'segria',
  Torrebesses: 'segria',
  Torredembarra: 'tarragones',
  Torrefarrera: 'segria',
  'Torrefeta i Florejacs': 'segarra',
  Torregrossa: 'pla-durgell',
  Torrelameu: 'noguera',
  'Torrelles de Foix': 'alt-penedes',
  'Torrelles de Llobregat': 'baix-llobregat',
  Torrent: 'baix-emporda',
  'Torres de Segre': 'segria',
  'Torroella de Fluvià': 'alt-emporda',
  'Torroella de Montgrí': 'baix-emporda',
  'Torroja del Priorat': 'priorat',
  Tortellà: 'garrotxa',
  Tortosa: 'baix-ebre',
  Torà: 'solsones',
  Toses: 'ripolles',
  'Tossa de Mar': 'selva',
  Tremp: 'pallars-jussa',
  Tàrrega: 'urgell',
  Térmens: 'noguera',
  Tírvia: 'pallars-sobira',
  Ullastrell: 'valles-occidental',
  Ullastret: 'baix-emporda',
  Ulldecona: 'montsia',
  Ulldemolins: 'priorat',
  Ullà: 'baix-emporda',
  Ultramort: 'baix-emporda',
  Urús: 'cerdanya',
  Vacarisses: 'valles-occidental',
  'Vall de Cardós': 'pallars-sobira',
  'Vall-llobrega': 'baix-emporda',
  "Vallbona d'Anoia": 'anoia',
  'Vallbona de les Monges': 'urgell',
  Vallcebre: 'bergueda',
  Vallclara: 'conca-de-barbera',
  'Vallfogona de Balaguer': 'noguera',
  'Vallfogona de Ripollès': 'ripolles',
  'Vallfogona de Riucorb': 'conca-de-barbera',
  Vallgorguina: 'valles-oriental',
  Vallirana: 'baix-llobregat',
  Vallmoll: 'alt-camp',
  Vallromanes: 'valles-oriental',
  Valls: 'alt-camp',
  "Vandellòs i l'Hospitalet de l'Infant": 'baix-camp',
  Veciana: 'anoia',
  Ventalló: 'alt-emporda',
  Verdú: 'urgell',
  Verges: 'baix-emporda',
  'Vespella de Gaià': 'tarragones',
  Vic: 'osona',
  Vidreres: 'selva',
  Vidrà: 'osona',
  'Vielha e Mijaran': 'aran',
  'Vila-rodona': 'alt-camp',
  'Vila-sacra': 'alt-emporda',
  'Vila-sana': 'pla-durgell',
  'Vila-seca': 'tarragones',
  Vilabella: 'alt-camp',
  Vilabertran: 'alt-emporda',
  Vilablareix: 'girones',
  Vilada: 'bergueda',
  Viladamat: 'alt-emporda',
  Viladasens: 'girones',
  Viladecans: 'baix-llobregat',
  Viladecavalls: 'valles-occidental',
  Vilademuls: 'pla-de-lestany',
  Viladrau: 'osona',
  Vilafant: 'alt-emporda',
  'Vilafranca del Penedès': 'alt-penedes',
  Vilagrassa: 'urgell',
  Vilajuïga: 'alt-emporda',
  'Vilalba Sasserra': 'valles-oriental',
  'Vilalba dels Arcs': 'terra-alta',
  Vilaller: 'alta-ribagorca',
  'Vilallonga de Ter': 'ripolles',
  'Vilallonga del Camp': 'tarragones',
  Vilamacolum: 'alt-emporda',
  Vilamalla: 'alt-emporda',
  Vilamaniscle: 'alt-emporda',
  Vilamòs: 'aran',
  Vilanant: 'alt-emporda',
  "Vilanova d'Escornalbou": 'baix-camp',
  'Vilanova de Bellpuig': 'pla-durgell',
  'Vilanova de Meià': 'noguera',
  'Vilanova de Prades': 'conca-de-barbera',
  'Vilanova de Sau': 'osona',
  'Vilanova de Segrià': 'segria',
  "Vilanova de l'Aguda": 'noguera',
  'Vilanova de la Barca': 'segria',
  'Vilanova del Camí': 'anoia',
  'Vilanova del Vallès': 'valles-oriental',
  'Vilanova i la Geltrú': 'garraf',
  Vilaplana: 'baix-camp',
  'Vilassar de Dalt': 'maresme',
  'Vilassar de Mar': 'maresme',
  Vilaverd: 'conca-de-barbera',
  Vilaür: 'alt-emporda',
  "Vilobí d'Onyar": 'selva',
  'Vilobí del Penedès': 'alt-penedes',
  Vilopriu: 'baix-emporda',
  'Vimbodí i Poblet': 'conca-de-barbera',
  Vinaixa: 'garrigues',
  Vinebre: 'ribera-debre',
  'Vinyols i els Arcs': 'baix-camp',
  'Viver i Serrateix': 'bergueda',
  'Vulpellac, Fonteta i Peratallada': 'baix-emporda',
  Xerta: 'baix-ebre',
  'el Bruc': 'anoia',
  'el Brull': 'osona',
  'el Catllar': 'tarragones',
  'el Cogul': 'garrigues',
  "el Far d'Empordà": 'alt-emporda',
  'el Figueró i Montmany': 'valles-oriental',
  'el Lloar': 'priorat',
  'el Masnou': 'maresme',
  'el Masroig': 'priorat',
  'el Milà': 'alt-camp',
  'el Molar': 'priorat',
  'el Montmell': 'baix-penedes',
  'el Morell': 'tarragones',
  "el Palau d'Anglesola": 'pla-durgell',
  'el Papiol': 'baix-llobregat',
  'el Perelló': 'baix-ebre',
  'el Pinell de Brai': 'terra-alta',
  'el Pla de Santa Maria': 'alt-camp',
  'el Pla del Penedès': 'alt-penedes',
  'el Poal': 'pla-durgell',
  "el Pont d'Armentera": 'alt-camp',
  'el Pont de Bar': 'alt-urgell',
  'el Pont de Suert': 'alta-ribagorca',
  'el Pont de Vilomara i Rocafort': 'bages',
  'el Port de la Selva': 'alt-emporda',
  'el Prat de Llobregat': 'baix-llobregat',
  'el Rourell': 'alt-camp',
  'el Soleràs': 'garrigues',
  'el Vendrell': 'baix-penedes',
  'el Vilosell': 'garrigues',
  'els Alamús': 'segria',
  'els Garidells': 'alt-camp',
  'els Guiamets': 'priorat',
  'els Hostalets de Pierola': 'anoia',
  'els Omellons': 'garrigues',
  'els Omells de na Gaia': 'urgell',
  'els Pallaresos': 'tarragones',
  'els Plans de Sió': 'segarra',
  'els Prats de Rei': 'anoia',
  'els Torms': 'garrigues',
  "l'Albagés": 'garrigues',
  "l'Albi": 'garrigues',
  "l'Albiol": 'baix-camp',
  "l'Aldea": 'baix-ebre',
  "l'Aleixar": 'baix-camp',
  "l'Ametlla de Mar": 'baix-ebre',
  "l'Ametlla del Vallès": 'valles-oriental',
  "l'Ampolla": 'baix-ebre',
  "l'Arboç": 'baix-penedes',
  "l'Argentera": 'baix-camp',
  "l'Armentera": 'alt-emporda',
  "l'Escala": 'alt-emporda',
  "l'Espluga Calba": 'garrigues',
  "l'Espluga de Francolí": 'conca-de-barbera',
  "l'Espunyola": 'bergueda',
  "l'Esquirol": 'osona',
  "l'Estany": 'moianes',
  "l'Hospitalet de Llobregat": 'barcelones',
  'la Baronia de Rialb': 'noguera',
  "la Bisbal d'Empordà": 'baix-emporda',
  'la Bisbal de Montsant': 'priorat',
  'la Bisbal del Penedès': 'baix-penedes',
  'la Canonja': 'tarragones',
  'la Cellera de Ter': 'selva',
  'la Coma i la Pedra': 'solsones',
  'la Fatarella': 'terra-alta',
  'la Febró': 'baix-camp',
  'la Figuera': 'priorat',
  'la Floresta': 'garrigues',
  'la Fuliola': 'urgell',
  'la Galera': 'montsia',
  'la Garriga': 'valles-oriental',
  'la Granada': 'alt-penedes',
  'la Granadella': 'garrigues',
  "la Granja d'Escarp": 'segria',
  "la Guingueta d'Àneu": 'pallars-sobira',
  'la Jonquera': 'alt-emporda',
  'la Llacuna': 'anoia',
  'la Llagosta': 'valles-oriental',
  'la Masó': 'alt-camp',
  'la Molsosa': 'solsones',
  'la Morera de Montsant': 'priorat',
  'la Nou de Berguedà': 'bergueda',
  'la Nou de Gaià': 'tarragones',
  "la Palma d'Ebre": 'ribera-debre',
  'la Palma de Cervelló': 'baix-llobregat',
  'la Pera': 'baix-emporda',
  'la Pobla de Claramunt': 'anoia',
  'la Pobla de Cérvoles': 'garrigues',
  'la Pobla de Lillet': 'bergueda',
  'la Pobla de Mafumet': 'tarragones',
  'la Pobla de Massaluca': 'terra-alta',
  'la Pobla de Montornès': 'tarragones',
  'la Pobla de Segur': 'pallars-jussa',
  'la Portella': 'segria',
  'la Quar': 'bergueda',
  'la Riba': 'alt-camp',
  'la Riera de Gaià': 'tarragones',
  'la Roca del Vallès': 'valles-oriental',
  'la Ràpita': 'montsia',
  'la Secuita': 'tarragones',
  'la Selva de Mar': 'alt-emporda',
  'la Selva del Camp': 'baix-camp',
  'la Sentiu de Sió': 'noguera',
  "la Seu d'Urgell": 'alt-urgell',
  'la Sénia': 'montsia',
  "la Tallada d'Empordà": 'baix-emporda',
  'la Torre de Cabdella': 'pallars-jussa',
  'la Torre de Claramunt': 'anoia',
  'la Torre de Fontaubella': 'priorat',
  "la Torre de l'Espanyol": 'ribera-debre',
  'la Vajol': 'alt-emporda',
  "la Vall d'en Bas": 'garrotxa',
  'la Vall de Bianya': 'garrotxa',
  'la Vall de Boí': 'alta-ribagorca',
  'la Vansa i Fórnols': 'alt-urgell',
  'la Vilella Alta': 'priorat',
  'la Vilella Baixa': 'priorat',
  'les Avellanes i Santa Linya': 'noguera',
  'les Borges Blanques': 'garrigues',
  'les Borges del Camp': 'baix-camp',
  'les Cabanyes': 'alt-penedes',
  'les Franqueses del Vallès': 'valles-oriental',
  'les Llosses': 'ripolles',
  'les Masies de Roda': 'osona',
  'les Masies de Voltregà': 'osona',
  'les Oluges': 'segarra',
  'les Piles': 'conca-de-barbera',
  "les Planes d'Hostoles": 'garrotxa',
  'les Preses': 'garrotxa',
  "les Valls d'Aguilar": 'alt-urgell',
  'les Valls de Valira': 'alt-urgell',
  Àger: 'noguera',
  Òdena: 'anoia',
  Òrrius: 'maresme',
};

// TODO Move to FE.
export const connectedRegions: Record<Region, Region[]> = {
  'alt-emporda': ['baix-emporda', 'garrotxa', 'girones', 'pla-de-lestany'],
  'baix-emporda': ['alt-emporda', 'girones', 'selva'],
  'pla-de-lestany': ['alt-emporda', 'garrotxa', 'girones'],
  girones: [
    'alt-emporda',
    'baix-emporda',
    'pla-de-lestany',
    'selva',
    'garrotxa',
  ],
  garrotxa: [
    'alt-emporda',
    'girones',
    'selva',
    'osona',
    'pla-de-lestany',
    'ripolles',
  ],
  selva: [
    'baix-emporda',
    'girones',
    'garrotxa',
    'osona',
    'valles-oriental',
    'maresme',
  ],
  ripolles: ['garrotxa', 'osona', 'cerdanya', 'bergueda', 'llucanes'],
  cerdanya: ['ripolles', 'bergueda', 'alt-urgell'],
  'alt-urgell': [
    'cerdanya',
    'bergueda',
    'solsones',
    'noguera',
    'pallars-jussa',
    'pallars-sobira',
  ],
  'pallars-sobira': ['alt-urgell', 'pallars-jussa', 'alta-ribagorca', 'aran'],
  aran: ['pallars-sobira', 'alta-ribagorca'],
  'alta-ribagorca': ['pallars-sobira', 'aran', 'pallars-jussa'],
  'pallars-jussa': [
    'alt-urgell',
    'pallars-sobira',
    'alta-ribagorca',
    'noguera',
  ],
  noguera: [
    'segria',
    'pla-durgell',
    'urgell',
    'segarra',
    'solsones',
    'alt-urgell',
    'pallars-jussa',
  ],
  solsones: ['anoia', 'alt-urgell', 'bergueda', 'noguera', 'segarra', 'bages'],
  segria: ['noguera', 'ribera-debre', 'pla-durgell', 'garrigues'],
  'terra-alta': ['ribera-debre', 'baix-ebre'],
  'baix-ebre': ['montsia', 'baix-camp', 'ribera-debre', 'terra-alta'],
  montsia: ['baix-ebre'],
  'baix-camp': [
    'tarragones',
    'alt-camp',
    'conca-de-barbera',
    'priorat',
    'ribera-debre',
  ],
  tarragones: ['baix-camp', 'alt-camp', 'baix-penedes'],
  'baix-penedes': ['tarragones', 'alt-penedes', 'garraf', 'alt-camp'],
  garraf: ['baix-penedes', 'alt-penedes', 'baix-llobregat'],
  'baix-llobregat': [
    'anoia',
    'barcelones',
    'valles-occidental',
    'garraf',
    'alt-penedes',
    'bages',
  ],
  barcelones: [
    'baix-llobregat',
    'valles-oriental',
    'valles-occidental',
    'maresme',
  ],
  maresme: ['selva', 'valles-oriental', 'barcelones'],
  'valles-oriental': [
    'osona',
    'barcelones',
    'valles-occidental',
    'maresme',
    'selva',
    'moianes',
  ],
  'alt-camp': [
    'conca-de-barbera',
    'baix-penedes',
    'tarragones',
    'alt-penedes',
    'anoia',
    'baix-camp',
  ],
  'alt-penedes': [
    'anoia',
    'baix-penedes',
    'garraf',
    'baix-llobregat',
    'alt-camp',
  ],
  'conca-de-barbera': [
    'urgell',
    'baix-camp',
    'priorat',
    'alt-camp',
    'segarra',
    'anoia',
    'garrigues',
  ],
  'pla-durgell': ['noguera', 'garrigues', 'urgell', 'segria'],
  'ribera-debre': [
    'segria',
    'baix-ebre',
    'terra-alta',
    'baix-camp',
    'garrigues',
    'priorat',
  ],
  'valles-occidental': [
    'valles-oriental',
    'bages',
    'baix-llobregat',
    'barcelones',
    'moianes',
  ],
  anoia: [
    'solsones',
    'alt-camp',
    'conca-de-barbera',
    'alt-penedes',
    'bages',
    'baix-llobregat',
    'segarra',
  ],
  bages: [
    'anoia',
    'valles-occidental',
    'moianes',
    'baix-llobregat',
    'osona',
    'solsones',
    'bergueda',
    'llucanes',
  ],
  bergueda: [
    'cerdanya',
    'solsones',
    'alt-urgell',
    'bages',
    'ripolles',
    'osona',
    'llucanes',
  ],
  garrigues: [
    'conca-de-barbera',
    'segria',
    'pla-durgell',
    'ribera-debre',
    'priorat',
    'urgell',
  ],
  llucanes: ['osona', 'bages', 'bergueda', 'ripolles', 'moianes'],
  moianes: [
    'osona',
    'bages',
    'valles-occidental',
    'valles-oriental',
    'llucanes',
  ],
  osona: [
    'ripolles',
    'bages',
    'bergueda',
    'moianes',
    'valles-oriental',
    'garrotxa',
    'selva',
    'llucanes',
  ],
  priorat: ['conca-de-barbera', 'ribera-debre', 'baix-camp', 'garrigues'],
  segarra: ['anoia', 'noguera', 'urgell', 'conca-de-barbera', 'solsones'],
  urgell: [
    'conca-de-barbera',
    'noguera',
    'pla-durgell',
    'garrigues',
    'segarra',
  ],
};
