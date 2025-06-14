This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Kom igång

För att komma igång med projektet behöver du Node.js och npm installerat på din dator. Projektet använder sig av Next.js och React.

### Installation

1.  **Klona repot:**
    Börja med att klona ner projektet till din lokala maskin:

    ```bash
    git clone https://github.com/RayanDoski/cryptocoin.git
    cd cryptocoin
    ```

2.  **Installera beroenden:**
    Installera sedan alla nödvändiga beroenden genom att köra:

    ```bash
    npm install
    ```

3.  **Konfigurera API-nyckel (Miljövariabler):**
    Detta projekt använder sig av API-nycklar som lagras säkert med hjälp av miljövariabler. Du behöver skapa en fil som heter `.env.local` i projektets rotkatalog. Denna fil kommer **inte** att inkluderas när du pushar din kod till ett offentligt repository, vilket håller dina känsliga nycklar säkra.

    I din `.env.local`-fil, lägg till din API-nyckel på följande format:

    ```
    API_KEY=CCKEY
    ```
    Ersätt `CCKEY` med API-nyckel. Next.js laddar automatiskt miljövariabler från `.env.local` när applikationen startas.

### Kör utvecklingsservern
    När installationen är klar kan du starta utvecklingsservern:

    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Projekt Beskrivning:

I vårt projektarbete har vi utvecklat en webbapplikation som kombinerar finansiell simulering med modern teknikstack. Webbappen låter användare "ladda" sitt konto med falska pengar och investera i riktiga kryptovalutor, men med virtuella medel. Detta gör att man kan testa olika investeringsstrategier och se hur värdet förändras över tid, vilket fungerar som ett pedagogiskt verktyg för att lära sig om kryptomarknaden.

Applikationen är byggd med Next.js, React och Tailwind CSS. Vi använde localStorage för att spara användardata lokalt i webbläsaren, vilket gör att användare kan återvända till sina investeringar utan att behöva logga in.

## Jämförelse mot andra ramverk/biblotek:

När det gäller valet av teknikstack för utveckling av frontend-applikationer har React blivit en dominerande kraft inom JavaScript-ekosystemet. Enligt en artikel publicerad på Dev.to, är React fortfarande det bästa JavaScript-ramverket för frontend-utveckling tack vare dess många inbyggda verktyg och användarvänlighet [1]. Detta styrks av att React har växt till att bli det mest använda JavaScript-ramverket sedan dess lansering 2013 [1].

Jämfört med vanilla JavaScript, som erbjuder full kontroll men saknar struktur för större projekt, erbjuder React en komponentbaserad arkitektur som gör det lättare att skala och underhålla kod. Medan vanilla JS kan vara mer transparent i små applikationer, blir det snabbt svårt att hantera komplexitet utan en tydlig struktur [1]. React förenklar detta genom att dela upp gränssnittet i återanvändbara komponenter som kan hanteras oberoende.

Vid jämförelse med andra moderna ramverk som Vue.js och Angular, som båda erbjuder reaktivitet som standard, visar sig React ha ett större ekosystem och starkare community [1]. Även om dessa konkurrerande ramverk kan erbjuda vissa funktioner som är inbyggda, som exempelvis statshantering, ger React utvecklaren större flexibilitet att bygga efter egna behov. Utöver detta har React en liten inlärningskurva för JavaScript-utvecklare, vilket gör det tillgängligt även för nybörjare samtidigt som det är tillräckligt kraftfullt för professionella utvecklare [1].

## Källor:
[1] K. Samson, "7 Reasons Why React is King of JavaScript UI Frameworks," dev.to , 10-Jul-2022. [Online]. Available: https://dev.to/kalashin1/7-reasons-why-react-is-king-of-javascript-ui-frameworks-1j76 . [Accessed: 02-june-2025].


### Dataflöde

[Komponentdiagram som visar props-flöde](public/DataFlow/diagram.png)