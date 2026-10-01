// Destinations the user can pick from. Shared by the UI (dropdown) and the API (validation).

export type Destination = {
  type: "country" | "city";
  name: string;
  country: string;
  /** ISO 3166-1 alpha-2 code (lowercase), used for the flag icon. */
  code: string;
  /** Value shown in the input and sent to the API, e.g. "Kyoto, Japan". */
  label: string;
};

type CountryEntry = [name: string, code: string, popularCities: string[]];

const COUNTRIES: CountryEntry[] = [
  ["Afghanistan", "af", ["Kabul", "Herat", "Mazar-i-Sharif"]],
  ["Albania", "al", ["Tirana", "Berat", "Sarandë", "Gjirokastër"]],
  ["Algeria", "dz", ["Algiers", "Oran", "Constantine"]],
  ["Andorra", "ad", ["Andorra la Vella"]],
  ["Angola", "ao", ["Luanda", "Benguela"]],
  ["Antigua and Barbuda", "ag", ["St. John's"]],
  ["Argentina", "ar", ["Buenos Aires", "Mendoza", "Bariloche", "Salta", "Ushuaia"]],
  ["Armenia", "am", ["Yerevan", "Gyumri", "Dilijan", "Sevan"]],
  ["Australia", "au", ["Sydney", "Melbourne", "Brisbane", "Perth", "Cairns", "Adelaide", "Hobart"]],
  ["Austria", "at", ["Vienna", "Salzburg", "Innsbruck", "Hallstatt"]],
  ["Azerbaijan", "az", ["Baku", "Sheki", "Ganja"]],
  ["Bahamas", "bs", ["Nassau"]],
  ["Bahrain", "bh", ["Manama"]],
  ["Bangladesh", "bd", ["Dhaka", "Chittagong", "Cox's Bazar"]],
  ["Barbados", "bb", ["Bridgetown"]],
  ["Belarus", "by", ["Minsk", "Brest"]],
  ["Belgium", "be", ["Brussels", "Bruges", "Antwerp", "Ghent"]],
  ["Belize", "bz", ["Belize City", "San Ignacio", "Caye Caulker"]],
  ["Benin", "bj", ["Cotonou", "Porto-Novo", "Ouidah"]],
  ["Bhutan", "bt", ["Thimphu", "Paro", "Punakha"]],
  ["Bolivia", "bo", ["La Paz", "Sucre", "Uyuni"]],
  ["Bosnia and Herzegovina", "ba", ["Sarajevo", "Mostar"]],
  ["Botswana", "bw", ["Gaborone", "Maun", "Kasane"]],
  ["Brazil", "br", ["Rio de Janeiro", "São Paulo", "Salvador", "Florianópolis", "Foz do Iguaçu", "Manaus"]],
  ["Brunei", "bn", ["Bandar Seri Begawan"]],
  ["Bulgaria", "bg", ["Sofia", "Plovdiv", "Varna"]],
  ["Burkina Faso", "bf", ["Ouagadougou", "Bobo-Dioulasso"]],
  ["Burundi", "bi", ["Bujumbura", "Gitega"]],
  ["Cambodia", "kh", ["Siem Reap", "Phnom Penh", "Kampot"]],
  ["Cameroon", "cm", ["Yaoundé", "Douala", "Limbe"]],
  ["Canada", "ca", ["Toronto", "Vancouver", "Montreal", "Quebec City", "Banff", "Ottawa"]],
  ["Cape Verde", "cv", ["Praia", "Mindelo"]],
  ["Central African Republic", "cf", ["Bangui"]],
  ["Chad", "td", ["N'Djamena"]],
  ["Chile", "cl", ["Santiago", "Valparaíso", "San Pedro de Atacama", "Puerto Natales"]],
  ["China", "cn", ["Beijing", "Shanghai", "Xi'an", "Chengdu", "Guilin", "Hong Kong"]],
  ["Colombia", "co", ["Bogotá", "Medellín", "Cartagena", "Santa Marta"]],
  ["Comoros", "km", ["Moroni"]],
  ["Costa Rica", "cr", ["San José", "La Fortuna", "Monteverde"]],
  ["Croatia", "hr", ["Dubrovnik", "Split", "Zagreb", "Zadar"]],
  ["Cuba", "cu", ["Havana", "Trinidad", "Viñales"]],
  ["Cyprus", "cy", ["Nicosia", "Limassol", "Paphos"]],
  ["Czech Republic", "cz", ["Prague", "Český Krumlov", "Brno"]],
  ["Democratic Republic of the Congo", "cd", ["Kinshasa", "Goma"]],
  ["Denmark", "dk", ["Copenhagen", "Aarhus", "Odense"]],
  ["Djibouti", "dj", ["Djibouti City"]],
  ["Dominica", "dm", ["Roseau"]],
  ["Dominican Republic", "do", ["Santo Domingo", "Punta Cana", "Puerto Plata"]],
  ["Ecuador", "ec", ["Quito", "Guayaquil", "Cuenca", "Galápagos Islands"]],
  ["Egypt", "eg", ["Cairo", "Luxor", "Aswan", "Alexandria", "Hurghada", "Sharm El Sheikh"]],
  ["El Salvador", "sv", ["San Salvador", "Santa Ana"]],
  ["Equatorial Guinea", "gq", ["Malabo"]],
  ["Eritrea", "er", ["Asmara", "Massawa"]],
  ["Estonia", "ee", ["Tallinn", "Tartu"]],
  ["Eswatini", "sz", ["Mbabane"]],
  ["Ethiopia", "et", ["Addis Ababa", "Lalibela", "Gondar"]],
  ["Fiji", "fj", ["Suva", "Nadi"]],
  ["Finland", "fi", ["Helsinki", "Rovaniemi", "Turku"]],
  ["France", "fr", ["Paris", "Nice", "Lyon", "Marseille", "Bordeaux", "Strasbourg"]],
  ["Gabon", "ga", ["Libreville"]],
  ["Gambia", "gm", ["Banjul"]],
  ["Georgia", "ge", ["Tbilisi", "Batumi", "Kutaisi", "Kazbegi"]],
  ["Germany", "de", ["Berlin", "Munich", "Hamburg", "Cologne", "Frankfurt", "Dresden"]],
  ["Ghana", "gh", ["Accra", "Kumasi", "Cape Coast"]],
  ["Greece", "gr", ["Athens", "Santorini", "Mykonos", "Crete", "Thessaloniki"]],
  ["Grenada", "gd", ["St. George's"]],
  ["Guatemala", "gt", ["Antigua Guatemala", "Guatemala City", "Flores"]],
  ["Guinea", "gn", ["Conakry"]],
  ["Guinea-Bissau", "gw", ["Bissau"]],
  ["Guyana", "gy", ["Georgetown"]],
  ["Haiti", "ht", ["Port-au-Prince", "Cap-Haïtien"]],
  ["Honduras", "hn", ["Tegucigalpa", "Roatán", "Copán Ruinas"]],
  ["Hungary", "hu", ["Budapest", "Eger", "Pécs"]],
  ["Iceland", "is", ["Reykjavík", "Akureyri", "Vík"]],
  ["India", "in", ["New Delhi", "Mumbai", "Jaipur", "Agra", "Goa", "Varanasi", "Udaipur", "Kochi"]],
  ["Indonesia", "id", ["Bali", "Jakarta", "Yogyakarta", "Lombok"]],
  ["Iran", "ir", ["Tehran", "Isfahan", "Shiraz", "Yazd"]],
  ["Iraq", "iq", ["Baghdad", "Erbil", "Basra"]],
  ["Ireland", "ie", ["Dublin", "Galway", "Cork", "Killarney"]],
  ["Israel", "il", ["Jerusalem", "Tel Aviv", "Haifa", "Eilat"]],
  ["Italy", "it", ["Rome", "Florence", "Venice", "Milan", "Naples", "Amalfi Coast"]],
  ["Ivory Coast", "ci", ["Abidjan", "Yamoussoukro"]],
  ["Jamaica", "jm", ["Kingston", "Montego Bay", "Negril"]],
  ["Japan", "jp", ["Tokyo", "Kyoto", "Osaka", "Hiroshima", "Sapporo", "Nara"]],
  ["Jordan", "jo", ["Amman", "Petra", "Aqaba", "Wadi Rum"]],
  ["Kazakhstan", "kz", ["Almaty", "Astana", "Shymkent"]],
  ["Kenya", "ke", ["Nairobi", "Mombasa", "Diani Beach", "Lamu"]],
  ["Kiribati", "ki", ["Tarawa"]],
  ["Kosovo", "xk", ["Pristina", "Prizren"]],
  ["Kuwait", "kw", ["Kuwait City"]],
  ["Kyrgyzstan", "kg", ["Bishkek", "Karakol", "Osh"]],
  ["Laos", "la", ["Luang Prabang", "Vientiane", "Vang Vieng"]],
  ["Latvia", "lv", ["Riga", "Jūrmala"]],
  ["Lebanon", "lb", ["Beirut", "Byblos", "Baalbek"]],
  ["Lesotho", "ls", ["Maseru"]],
  ["Liberia", "lr", ["Monrovia"]],
  ["Libya", "ly", ["Tripoli", "Benghazi"]],
  ["Liechtenstein", "li", ["Vaduz"]],
  ["Lithuania", "lt", ["Vilnius", "Kaunas", "Klaipėda"]],
  ["Luxembourg", "lu", ["Luxembourg City"]],
  ["Madagascar", "mg", ["Antananarivo", "Nosy Be"]],
  ["Malawi", "mw", ["Lilongwe", "Blantyre"]],
  ["Malaysia", "my", ["Kuala Lumpur", "Penang", "Langkawi", "Malacca"]],
  ["Maldives", "mv", ["Malé"]],
  ["Mali", "ml", ["Bamako", "Timbuktu"]],
  ["Malta", "mt", ["Valletta", "Mdina", "Gozo"]],
  ["Marshall Islands", "mh", ["Majuro"]],
  ["Mauritania", "mr", ["Nouakchott"]],
  ["Mauritius", "mu", ["Port Louis"]],
  ["Mexico", "mx", ["Mexico City", "Cancún", "Oaxaca", "Tulum", "Guadalajara"]],
  ["Micronesia", "fm", ["Palikir"]],
  ["Moldova", "md", ["Chișinău"]],
  ["Monaco", "mc", ["Monte Carlo"]],
  ["Mongolia", "mn", ["Ulaanbaatar"]],
  ["Montenegro", "me", ["Kotor", "Budva", "Podgorica"]],
  ["Morocco", "ma", ["Marrakech", "Fes", "Chefchaouen", "Casablanca", "Essaouira"]],
  ["Mozambique", "mz", ["Maputo", "Tofo"]],
  ["Myanmar", "mm", ["Yangon", "Bagan", "Mandalay"]],
  ["Namibia", "na", ["Windhoek", "Swakopmund"]],
  ["Nauru", "nr", ["Yaren"]],
  ["Nepal", "np", ["Kathmandu", "Pokhara", "Chitwan"]],
  ["Netherlands", "nl", ["Amsterdam", "Rotterdam", "Utrecht", "The Hague"]],
  ["New Zealand", "nz", ["Auckland", "Queenstown", "Wellington", "Christchurch", "Rotorua"]],
  ["Nicaragua", "ni", ["Granada", "León", "Managua"]],
  ["Niger", "ne", ["Niamey", "Agadez"]],
  ["Nigeria", "ng", ["Lagos", "Abuja"]],
  ["North Korea", "kp", ["Pyongyang"]],
  ["North Macedonia", "mk", ["Skopje", "Ohrid"]],
  ["Norway", "no", ["Oslo", "Bergen", "Tromsø"]],
  ["Oman", "om", ["Muscat", "Nizwa", "Salalah"]],
  ["Pakistan", "pk", ["Lahore", "Islamabad", "Karachi", "Hunza"]],
  ["Palau", "pw", ["Koror"]],
  ["Palestine", "ps", ["Bethlehem", "Ramallah", "Jericho"]],
  ["Panama", "pa", ["Panama City", "Bocas del Toro", "Boquete"]],
  ["Papua New Guinea", "pg", ["Port Moresby"]],
  ["Paraguay", "py", ["Asunción", "Encarnación"]],
  ["Peru", "pe", ["Lima", "Cusco", "Arequipa", "Puno"]],
  ["Philippines", "ph", ["Manila", "Cebu", "Palawan", "Boracay"]],
  ["Poland", "pl", ["Kraków", "Warsaw", "Gdańsk", "Wrocław"]],
  ["Portugal", "pt", ["Lisbon", "Porto", "Madeira", "Algarve"]],
  ["Qatar", "qa", ["Doha"]],
  ["Republic of the Congo", "cg", ["Brazzaville", "Pointe-Noire"]],
  ["Romania", "ro", ["Bucharest", "Brașov", "Cluj-Napoca", "Sibiu"]],
  ["Russia", "ru", ["Moscow", "Saint Petersburg", "Kazan"]],
  ["Rwanda", "rw", ["Kigali", "Musanze"]],
  ["Saint Kitts and Nevis", "kn", ["Basseterre"]],
  ["Saint Lucia", "lc", ["Castries", "Soufrière"]],
  ["Saint Vincent and the Grenadines", "vc", ["Kingstown"]],
  ["Samoa", "ws", ["Apia"]],
  ["San Marino", "sm", []],
  ["Sao Tome and Principe", "st", ["São Tomé"]],
  ["Saudi Arabia", "sa", ["Riyadh", "Jeddah", "AlUla"]],
  ["Senegal", "sn", ["Dakar", "Saint-Louis"]],
  ["Serbia", "rs", ["Belgrade", "Novi Sad", "Niš"]],
  ["Seychelles", "sc", ["Victoria", "Praslin"]],
  ["Sierra Leone", "sl", ["Freetown"]],
  ["Singapore", "sg", []],
  ["Slovakia", "sk", ["Bratislava", "Košice"]],
  ["Slovenia", "si", ["Ljubljana", "Bled", "Piran"]],
  ["Solomon Islands", "sb", ["Honiara"]],
  ["Somalia", "so", ["Mogadishu", "Hargeisa"]],
  ["South Africa", "za", ["Cape Town", "Johannesburg", "Durban", "Stellenbosch"]],
  ["South Korea", "kr", ["Seoul", "Busan", "Jeju", "Gyeongju"]],
  ["South Sudan", "ss", ["Juba"]],
  ["Spain", "es", ["Barcelona", "Madrid", "Seville", "Valencia", "Granada", "Mallorca"]],
  ["Sri Lanka", "lk", ["Colombo", "Kandy", "Galle", "Ella"]],
  ["Sudan", "sd", ["Khartoum"]],
  ["Suriname", "sr", ["Paramaribo"]],
  ["Sweden", "se", ["Stockholm", "Gothenburg", "Malmö"]],
  ["Switzerland", "ch", ["Zurich", "Geneva", "Lucerne", "Interlaken", "Zermatt"]],
  ["Syria", "sy", ["Damascus", "Aleppo"]],
  ["Taiwan", "tw", ["Taipei", "Tainan", "Kaohsiung"]],
  ["Tajikistan", "tj", ["Dushanbe", "Khujand"]],
  ["Tanzania", "tz", ["Zanzibar", "Arusha", "Dar es Salaam"]],
  ["Thailand", "th", ["Bangkok", "Chiang Mai", "Phuket", "Krabi", "Koh Samui"]],
  ["Timor-Leste", "tl", ["Dili"]],
  ["Togo", "tg", ["Lomé"]],
  ["Tonga", "to", ["Nukuʻalofa"]],
  ["Trinidad and Tobago", "tt", ["Port of Spain"]],
  ["Tunisia", "tn", ["Tunis", "Sidi Bou Said", "Djerba"]],
  ["Turkey", "tr", ["Istanbul", "Cappadocia", "Antalya", "Izmir", "Bodrum"]],
  ["Turkmenistan", "tm", ["Ashgabat"]],
  ["Tuvalu", "tv", ["Funafuti"]],
  ["Uganda", "ug", ["Kampala", "Entebbe", "Jinja"]],
  ["Ukraine", "ua", ["Kyiv", "Lviv", "Odesa"]],
  ["United Arab Emirates", "ae", ["Dubai", "Abu Dhabi"]],
  ["United Kingdom", "gb", ["London", "Edinburgh", "Manchester", "Liverpool", "Bath", "Oxford"]],
  [
    "United States",
    "us",
    [
      "New York City", "Los Angeles", "San Francisco", "Las Vegas", "Miami", "Chicago",
      "New Orleans", "Honolulu", "Washington, D.C.", "Boston", "Seattle",
    ],
  ],
  ["Uruguay", "uy", ["Montevideo", "Punta del Este", "Colonia del Sacramento"]],
  ["Uzbekistan", "uz", ["Samarkand", "Bukhara", "Tashkent", "Khiva"]],
  ["Vanuatu", "vu", ["Port Vila"]],
  ["Vatican City", "va", []],
  ["Venezuela", "ve", ["Caracas", "Mérida"]],
  ["Vietnam", "vn", ["Hanoi", "Ho Chi Minh City", "Hoi An", "Da Nang", "Huế"]],
  ["Yemen", "ye", ["Sana'a", "Aden"]],
  ["Zambia", "zm", ["Lusaka", "Livingstone"]],
  ["Zimbabwe", "zw", ["Harare", "Victoria Falls"]],
];

export const DESTINATIONS: Destination[] = COUNTRIES.flatMap(([country, code, cities]) => [
  { type: "country" as const, name: country, country, code, label: country },
  ...cities.map((name) => ({
    type: "city" as const,
    name,
    country,
    code,
    label: `${name}, ${country}`,
  })),
]);

const BY_LABEL = new Map(DESTINATIONS.map((d) => [d.label, d]));
export const findDestination = (label: string) => BY_LABEL.get(label);
export const isKnownDestination = (label: string) => BY_LABEL.has(label);

/** Popular cities of a country, in the order listed above. */
export const citiesOf = (country: string) =>
  DESTINATIONS.filter((d) => d.type === "city" && d.country === country);

/** Lowercase and strip accents so "sao paulo" matches "São Paulo". */
export const normalize = (text: string) =>
  text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

/**
 * Matches name or country. Ranks names that start with the query first,
 * then other name matches, then cities matched by their country.
 */
export function searchDestinations(query: string, limit = 50): Destination[] {
  const q = normalize(query);
  // Empty search: browse every country alphabetically.
  if (!q) return DESTINATIONS.filter((d) => d.type === "country");

  const scored: { d: Destination; score: number }[] = [];
  for (const d of DESTINATIONS) {
    const name = normalize(d.name);
    let score: number;
    if (name.startsWith(q)) score = d.type === "country" ? 0 : 1;
    else if (name.includes(q)) score = 2;
    else if (normalize(d.country).startsWith(q)) score = 3;
    else continue;
    scored.push({ d, score });
  }
  return scored
    .sort((a, b) => a.score - b.score || a.d.label.localeCompare(b.d.label))
    .slice(0, limit)
    .map((s) => s.d);
}
