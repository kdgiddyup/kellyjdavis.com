export const portfolioData = [
        {
            name: "Gulfstream News",
            tech: "UIKit, Webpack, Babel, AWS (DynamoDB, S3, Cognito, Lambda, CloudFront), Jekyll",
            desc: `Full stack development of informational site for <a href="https://gulfstream.com" target="_blank">Gulfstream Aerospace</a> aimed at media partners.`,
            image: "gulfstreamnews.png",
            url: "https://gulfstreamnews.com"
        },
        {
            name: "Live traffic monitor",
            tech: "Node.js, Express, Cheerio/Request, Google Maps API, Graph.js, custom API",
            desc: `I built a custom API to scrape the SC DOT's automatic traffic reporting system, which delivers hourly reports on current vehicle counts, historic counts and average speeds. I'm experimenting with delivering this to an audience using graph.js. <a href="https://github.com/kdgiddyup/realtimeTraffic" target="_blank">Github repo</a>`,
            image: "realtimetraffic.jpg",
            url: "demos/realtimeTraffic/"
        },
        {
            name: "Special Sections index generator",
            tech: "JavaScript, jQuery, Ajax, issuu.com API, md5 hashing, HTML, CSS",
            desc: `Auto-updating page of specialty and seasonal advertising and marketing sections produced by The Island Packet and The Beaufort Gazette, linked to their Issuu-hosted versions. Content is generated via Ajax calls to the Issuu API, which returns doc IDs and image tags necessary to create an index. <a href="https://github.com/kdgiddyup/issuuAPI" target="_blank">Github demo code</a>`,
            image: "issuuAPI.png",
            url: "http://www.islandpacket.com/customer-service/marketing/article165374852.html"
        },
        {
            name: "Booking photos display",
            url: "http://www.islandpacket.com/news/local/crime/local-arrests/",
            tech: "JavaScript, jQuery, PHP, Ajax, HTML, CSS",
            desc: `Adapted an existing PHP back-end that parses XML provided by the Beaufort County (S.C.) Detention Center for recent bookings and delivers them to the client's browser, where they are displayed as a thumbnail index. Clicking on image sends user to a detail page where select booking information is presented. <a href="http://media.islandpacket.com/static/news/crime/mugshots/mugshots2.js" target="_blank">My client-side javascript</a> | <a href="http://kellyjdavis.com/demos/code_repo/mugshots90.php" target="_blank">Server-side PHP (adapted from C. Hessert)</a>`,
            image: "mugshots.png"
        },
        {
            name: "The Woman in the Marsh",
            tech: "HTML/CSS/JavaScript",
            desc: "An example of special news presentation using custom HTML, CSS and javascript.",
            image: "BehindTheHotel.gif",
            url: "http://media.islandpacket.com/static/news/daryan/"
        },
        {
            name: "Close calls and regrets",
            tech: "HTML/CSS/JavaScript",
            desc: "Custom news presentation about people who refused to evacuate for Hurricane Matthew, using HTML, CSS and javascript",
            image: "matthewWind.gif",
            url: "http://media.islandpacket.com/static/news/hurricanes/matthew2016/timeline.html"
        },
        {
            name: "A day in the field: Ride along with these Lowcountry foxhunters",
            tech: "HTML/CSS/JavaScript",
            desc: "Custom news presentation about a foxhunting club in Colleton County, S.C., using HTML, CSS and javascript",
            image: "foxHunting.jpg",
            url: "http://media.islandpacket.com/static/news/foxhunt/"
        },
        {
            name: "Propping up paradise: Hilton Head Island hospitality workers scarcer than ever",
            tech: "HTML/CSS/JavaScript",
            desc: "Custom news presentation on workforce problems facing Hilton Head Island hospitality employers, using HTML, CSS and javascript",
            image: "onthebus.gif",
            url: "http://media.islandpacket.com/static/news/workforce/"
        },
        {
            name: "Finn's extraordinary adventure",
            tech: "HTML/CSS/JavaScript",
            desc: "Custom news presentation on the unusual efforts to find and rescue a dog lost on Spring Island, S.C., using HTML, CSS and javascript",
            image: "finn_splash2.jpg",
            url: "http://media.islandpacket.com/static/news/finn/"
        },
    ];