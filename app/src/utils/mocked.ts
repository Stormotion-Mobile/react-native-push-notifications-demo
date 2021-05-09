import {Article} from './types';

export const mockedArticles: Article[] = [
  {
    id: 'article1',
    title: 'What to Consider when Integrating BLE in your React Native App',
    shortContent:
      'Bluetooth Low Energy (or simply BLE) devices are extremely popular these days. In Stormotion, we have already worked with them in a few projects: one regarding vaping and another — fitness tracking devices.',
    content: `Bluetooth Low Energy (or simply BLE) devices are extremely popular these days. In Stormotion, we have already worked with them in a few projects: one regarding vaping and another — fitness tracking devices.\n\nIn this article, we specifically focus on the integration of BLE devices in React Native. Yet, how is this technology different from classic Bluetooth? And what are its key concepts? A brief explanation is below!\n\n\n# 📳 Bluetooth Low Energy: Main Concepts and Difference from Classic Bluetooth\nWe all know what Bluetooth is — a short-range wireless networking protocol to quickly connect devices. Currently, it has 2 versions: Bluetooth Classic and Bluetooth Low Energy.\n\n * ***Bluetooth Classic*** is often referred to as just Bluetooth. This technology can support continuous connections and transfer big amounts of data. This may include phone calls, audio streaming, data\n * ***Bluetooth Low Energy*** is also known as BLE. This is a version of Bluetooth that is adapted to low power sensors and accessories. Such devices don’t require continuous connection but depend on long battery life. They are especially popular in fitness, healthcare, security, home entertainment industries, and beacons.\n\nWhat are the main terms you need to know when working with this technology? Check below!\n\n# Key concepts for BLE 📖\nBefore you move to BLE integration in a React Native App, it’s important to know how this technology works. We won’t focus on that much but will still refresh some key concepts.\n\nGATT stands for *Generic Attribute Profile* that defines how BLE-devices transfer data. To make data transfer possible, devices should have a dedicated connection.\n\nBLE-devices are often referred to as peripheral devices, while smartphones, tablets, and other similar gadgets — as central devices. Every peripheral device can have an exclusive connection with one central device at a time, while the central device can be simultaneously connected to multiple peripherals:\n\n![BLE_connections](https://stormotion.io/blog/content/images/2020/07/ble-connections.png)\n\nConnection between a central and peripheral devices (*image by [Kevin Townsend](https://learn.adafruit.com/users/ktownsend)*)\n\nSince we’re talking about GATT, let’s take a bit closer look at the server/client relationship:\n\n * From that perspective, a peripheral device is known as the GATT **Server**  that contains data.\n * A central device acts as the GATT **Client** that sends requests to this server.\n\nThe Client initiates all the transactions by asking the Server for data. There are 2 ways to transfer data from the Server to the Client: Notifications and Indications.\n\n * **Notification** is a one-way message. It goes faster since it doesn’t ask the Client whether it has received the message or not.\n * **Indication** describes a system of two-way communication. The Server sends a message ➡️ the Client receives the message and sends a confirmation message back to the Server ➡️ the Server knows that the initial message has reached the Client.\n\nData transfer itself is based on a few high-level objects: Profiles, Services, and Characteristics.\n\n![ble-profile-service-characteristic](https://stormotion.io/blog/content/images/2020/07/ble-profile-service-characteristic.png)\n\nThe hierarchy of Profiles, Services and Characteristics (*image by [Kevin Townsend](https://learn.adafruit.com/users/ktownsend)*)\n\n * **Profile**  is a predefined set of Services.\n * **Services**  break data up into logic blocks that consist of Characteristics.\n * **Characteristic**  is a single data point, including an array of related data like X/Y/Z values from a 3-axis accelerometer.\n\nHere's an example of how it may look for a fitness tracking device:\n\n![ble-structure-example](https://stormotion.io/blog/content/images/2020/07/ble-structure-example.jpg)\n\nExample of Profile structure (*image by [Mohammad Afaneh](https://www.novelbits.io/author/mafaneh/)*)\n\nIf we break down the example above into smaller pieces:\n\n| Profile | Blood Pressure |   |\n| -- |  -- |  -- | \n| Services | Blood Pressure Service| Device Information Service |\n| Characteristics | Intermediate Cuff Pressure | Manufacturer Name String |\n|   | Blood Pressure Measurement | Hardware Revision String |\n|   | Blood Pressure Feature | Model Number String| \n\n You can read a bit more on GATT, Profile, Services and Characteristics [here](https://learn.adafruit.com/introduction-to-bluetooth-low-energy/gatt), and on Notifications & Indications — [here](https://community.nxp.com/docs/DOC-328525).`,
    cover: 'https://media.graphcms.com/Q3JY4LtcRpqkrWmryJKh',
  },
  {
    id: 'article2',
    title: 'Digital Transformation Guide: Milestones and Examples',
    content: `Cover image by [Dmitrij](https://dribbble.com/Dmitrij)\n\nEverybody’s talking about the digital transformation of business these days. Many business have already switched their products, services, and internal processes to digital; even more are going through this process now. \n\nYou’re probably thinking about moving in this direction, too. Yet, it leaves you with many questions like:\n\n * What exactly is Digital Transformation? How can you apply it to your business?\n * Who should do it?\n * What are the benefits? Do I need it all?\n * How much can it cost?\n\n**In this article, we’ll answer these questions, guide you through all the key steps of digital transformation, and explain how you can do it for your company.** Use the content table on top of the page (it’ll also appear when you scroll down to the next paragraph) to quickly jump to the needed part!\n\n\n# 💻 Digital Transformation of Business: What is It?\nBefore we review the best examples of digital transformation and share some “how-to” insights, let’s first define what we’re talking about.\n\nThe topic became especially popular and relevant in the light of COVID-19. The whole world went digital. Restaurants that had already offered delivery got a huge advantage over those that hadn’t and were only jumping at these digital rails. Retailers with a limited online presence and few delivery options were forced to jump on this digital bandwagon. You can find similar examples almost in any industry.\n\nHere's a great introductory video to explain the concept:\n\n[![Digital transformation](https://img.youtube.com/vi/508CR1fd8ws/0.jpg)](https://www.youtube.com/watch?v=508CR1fd8ws)\n\nYet, the Coronavirus pandemic didn’t start these processes but rather accelerated them. In [IDC FutureScape: Worldwide Digital Transformation 2020 Predictions](https://www.idc.com/getdoc.jsp?containerId=prUS45617519), published in October 2019, researchers have analyzed some digital transformation strategy examples and trends of recent years. Eventually, some of the key  predictions were:\n\n * By 2023, investments in digital transformation will grow from 36% in 2019 to over 50% of all information and communication technology investments.\n * Investments in direct digital transformations are rapidly growing at an annual rate of 17.5%. They’re expected to approach $7.4 trillion over 2020-2023.\n * By 2024, artificial intelligence-powered companies will respond to their customers and partners 50% faster than their peers.\n\nAs you can see now and will see even better from digital transformation examples, companies are heavily investing in this process. But what exactly do they invest in?\n\n# 📖 Digital Transformation: Definition\nYou can find probably hundreds of different definitions. However, they’re all built around the same idea:\n\n> Digital Transformation is the integration of digital technologies in all areas of a company’s operations.\n\nDigital transformation examples show us that this process affects businesses on many different levels. For example:\n\n * the way they collect, analyze and use data;\n * how they interact with customers;\n * the way employees work;\n * products they offer to customers (including solely digital ones);\n * how business processes work and others.\n\nThe short terms to refer to this process are DT or, much more popular form, DX. While DT is quite obviously an abbreviation for Digital Transformation, the second term may seem a bit unclear.\n\n\n![DX transformation](https://stormotion.io/blog/content/images/2020/07/dx-transformation.png)\n\nHow the concept of DX transformed through the years (*image by [OpusCapita](https://www.opuscapita.com/)*)\n\nX, in this case, means “everything”. Like in the term XaaS — “everything-as-a-Service”. It underlines the idea that DX isn’t about some specific part of your business but about everything: from employees and tools they use to products and services you offer. You’ll clearly see it closer to the end of the article where we review the best examples of digital\ntransformation from different fields.\n\n\n# ⚙️ Key Steps of the Digital Transformation Process\nNow you’re probably wondering how the DX implementation goes. Yet, it may seem like a quite complex and complicated process with no clear starting point.\n\nHow do you start? What should you do then? What steps should you take in the first place?\n\nThus, we’ll provide you with digital transformation strategy examples. So when you finish reading this article, you’ll have a clear understanding of what’s to be done next.\n\n## 🏆 3 Major Steps of DX\nAt the highest level, the strategy consists of [3 big steps](https://er.educause.edu/blogs/2020/6/consider-the-three-ds-when-talking-about-digital-transformation) or 3 D’s — Digitization, Digitalization, and Digital Transformation. You may see these steps as links of a single chain:\n\n 1. We digitize information. Simply: this is the transition of data in an analog form to a digital form; putting information online that wasn’t online before. It may relate to papers, cards, and all other aspects of your business that are done offline & manually so far.\n 2. We digitalize processes. Digitalization describes the process of using digital tools and technologies to transform different operations — payroll,  employee management, delivery, communication, and others. Yet, digitalization is quite a limited process that usually covers one branch or direction, improving it but not reshaping the whole business.\n 3. We digitally transform institutions. This is a complex process that doesn’t finish when you introduce a new feature or digitalize an old one. It’s rather a long continuous process that is both initiated by and encourages shifts in the workforce, management, culture, products, used technologies and approaches, etc. To succeed in DX, companies should go through significant digitization and digitalization.`,
    shortContent:
      'Everybody’s talking about the digital transformation of business these days. Many business have already switched their products, services, and internal processes to digital; even more are going through this process now.',
    cover: 'https://media.graphcms.com/Wd1E7drZRTsTYkBPONbQ',
  },
  {
    id: 'article3',
    title: 'Top 8 Software Development Companies in Germany',
    content: `A good Tech Partner is much more than just “working hands” that turn your idea into code. The best projects are born when a development team is really enthusiastic and eager to build your Product. Of course, it’s clear as day that a company should also have:\n\n * relevant experience and expertise;\n * trustworthy testimonials from other customers;\n * adequate pricing model;\n * no significant cultural gap.\n\nFor this article, we’ve studied reviews & profiles of Top Software Companies in Germany on [Clutch](https://clutch.co/), [The Manifest](https://themanifest.com/) and [GoodFirms](https://www.goodfirms.co/)  to help you find a perfect Tech Partner for your project. Here they are!\n\n# Infopulse\nIf you’re looking for software companies in Germany that have been around for almost 30 years, Infopulse may seem like an option.\n\n![Infopulse](https://stormotion.io/blog/content/images/2019/10/infopulse.png)\n\nThe company was founded in Kyiv (Ukraine), in 1991. Since that time Infopulse managed to build a broad network of offices in 11 countries and unite over 2,000 of employees.\n\nBelow is some data to consider before choosing the company as your key tech partner:\n| | |\n| :--: | :--: |\n|🖥 Website|  [https://www.infopulse.com](https://www.infopulse.com/) |\n| 💸 Average hourly rate | $25-$49 |\n|  🛠 Main Services | Software Engineering,  Cloud Services, Microsoft/SAP Services|\n| 💼 Client Focus | Midsize companies and enterprises (70%)\n |💻 Main programming languages | JavaScript, Java, C# |\n | 🧠 Expertise |  AI, Machine Learning, Chatbots, Cybersecurity, AR/VR |\n\nHow the company from Ukraine ended up on the list of Software Development Companies in Germany? Except for working with local clients (like Revacom or Gräfe und Unzer Verlag GmbH), Infopulse also has offices in Bonn, Böblingen, Munich and Gaildorf!\n\nOne of their German customers, Lindner Software & Consulting GmbH, described working with Infopulse as follows:\n\n> They are communicative, responsive, and able to think creatively to follow requirements carefully and execute them professionally.\n\n# Stormotion\nBig companies with a history dating back to 1990s and early 2000s may have their advantage in terms of experience (if you measure it in years). However, as they get bigger, they often lose the so-called “personal touch” with their customers and become interested only in big projects. And that’s when younger companies can offer a tempting alternative.\n\nStormotion is the representative of the younger generation of IT companies in Germany. It was founded in 2015, in Dnipro (Ukraine).\n\n![Stormotion](https://stormotion.io/blog/content/images/2019/10/stormotion.png)\n\nDespite being a Ukrainian company, Stormotion has many ties to Germany. Except for nailing many successful Projects for German companies and Startups, regular roadshows to Germany are a usual part of Stormotion’s working culture to meet the customers, establish human contact and provide that missing “personal touch”.\n|  | |\n| :--: | :--: |\n|  🖥 Website | [https://stormotion.io](https://stormotion.io/)\n| 💸 Average hourly rate | ~$40 |\n|  🛠 Main Services | Mobile Development, Web Development, Startup, PoC/Prototype/MVP) Development |\n| 💼 Client Focus | Small/midsize businesses and Startups (90%)|\n| 💻 Main programming languages| JavaScript, Swift, Kotlin |\n |🧠 Expertise | React Native (cross-platform app development), Startup development, Healthcare/Fitness/Travel/Lifestyle industries |\n\nStormotion is on the list of software development companies in Germany also because of its customers. Among them are such German Startups and companies as:\n\n * [Civocracy](https://www.civocracy.org/)  — an app for digital democracy;\n * [Voya](https://voya.ai/)  — a smart business travel management app;\n * [Humanoo](https://www.humanoo.com/)  — a mobile healthcare platform;\n * [Bidroom](https://bidroom.com/)  — a hotel booking application.\n\n> Learn More [Civocracy Case Study](https://stormotion.io/blog/civocracy-our-case-study/)\n\nThat’s how the Voya’s CTO has characterized the cooperation with Stormotion:\n\n> Stormotion delivered a stable, responsive, and attractive app. They collaborated seamlessly with internal staff and adhered to agile processes.\n\n# 💡 Takeaways\nOf course, this is not a comprehensive list of software companies. Germany has much more to offer you! In this article, we tried to pick the best companies from a bunch of trustworthy sources (we’ve mentioned them in the very beginning).\n\nWe also tried to make this list not too look very similar — so we picked IT companies in Germany of different size, fields of expertise, location and other characteristics. We hope it will help you find your perfect Tech Partner!\n\nLooking for a reliable Partner in Crime to build your Unicorn Startup or an application for your Business? We’re here to deliver the result! Challenge us with your Idea ;)\n\n**Challenge us with your idea!**`,
    shortContent:
      'A good Tech Partner is much more than just “working hands” that turn your idea into code. The best projects are born when a development team is really enthusiastic and eager to build your Product. Of course, it’s clear as day that a company should also have...',
  },
];
