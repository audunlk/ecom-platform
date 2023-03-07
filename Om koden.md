## Code challenge 
## Audun Larsson Kleveland

## En ecommerce platform med enkle features:
-Design
Siden skal være relativt responsiv, men er hovedsakelig utformet for web. All utforming i SASS.

-Tillater oppretting av bruker.
Enkel oppretting av bruker samt login.

-Produktoversikt
I produktoversikten kan man legge til produkter og velge valuta fra nåtid FOREX etter ønske/region.


-Tillater å legge til produkter i handlekurv
Siden tillater å legge til produkter i handlekurven selv om man
ikke er innlogget. Man kan deretter registrere en bruker, og beholde handlekurven uten å miste dens innhold.

Om flere produkter av samme ID blir lagt til,  blir disse summert istede for å vise gjentatte produkter flere ganger.

-Ordre
Siden tillater å behandle ordre. Ordrer blir ikke sendt til database før ordren er gjennomført. 

-ORM
Sequelize benyttes for å definere modeller og input, men også for å gjøre queries mot local postgres database.

-Bilder
Bilder blir lagret lokalt og urlen blir generert med produkt navn som url i database når et nytt produkt registrers. Blir linket til frontend fra 3333 via proxy. 

-Annet
Benytter JWT for token håndtering.

Bcrypt for å cryptere passord.

Hadde litt problemer med å håndtere state av endringer i Components/Nav. Fungerer fint med handlekurven.


