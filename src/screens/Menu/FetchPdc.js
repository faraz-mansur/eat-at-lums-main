import axios from "axios";
const cheerio = require("cheerio");

const fetchMenu = async () => {
  console.log("ffetch");
  const updatedMenu = [];
  let items = [];
  let menu = [];
  await axios
    .get("https://pdc.lums.edu.pk/pdc-screen/")
    .then((response) => {
      const $ = cheerio.load(response.data);
      const menuTables = $("table");
      // const items = [];

      menuTables.each((index, table) => {
        //   if (index === 12) {
        const menuItems = $(table)
          .find("tr")
          .toArray()
          .map((row) => {
            const columns = $(row).find("td").toArray();
            return {
              name: $(columns[0]).text().trim(),
              price: $(columns[1]).text().trim(),
            };
          });
        // console.log(`Menu Items (${index}):`, menuItems);
        items.push(...menuItems);
        //   }
      });

      items = items[12].name;

      const menuItems = [];
      let currentItem = {};
      const words = items.split(" ");
      for (let i = 0; i < words.length; i++) {
        const word = words[i].trim();
        if (word === "" || word === "-") {
          continue;
        }
        if (word === "Full:" || word === "Half:" || word === "Quarter:") {
          currentItem.size = word.slice(0, -1);
          currentItem.price = words[i + 1] + words[i + 2];
          menuItems.push(currentItem);
          currentItem = {};
          i++; // skip the next word (the price)
        } else if (word === "Rs.") {
          currentItem.price = words[i + 1];
          menuItems.push(currentItem);
          currentItem = {};
          i++; // skip the next word (the price)
        } else {
          let word1 = word.replace(/[-\t\r]/g, "").trim();
          currentItem.name = word1.replace(/[\/\n]/g, "");
          // currentItem.name = (currentItem.name || "") + " " + word;
        }
      }

      for (let i = 0; i < menuItems.length; i++) {
        const item = menuItems[i];

        if (item.name.startsWith("Half:") || item.name.startsWith("Quarter:")) {
          // Check the previous item and update its size and price accordingly
          const previousItem = updatedMenu[updatedMenu.length - 1];

          if (item.name.startsWith("Half:")) {
            previousItem.half_size = "Half";
            previousItem.half_price = item.price;
          } else {
            previousItem.quarter_size = "Quarter";
            previousItem.quarter_price = item.price;
          }
        } else {
          // Add the current item to the updated menu
          const newItem = {
            name: item.name,
            full_size: "Full",
            price: item.price,
          };

          updatedMenu.push(newItem);
        }
      }
      console.log(updatedMenu);
      return updatedMenu;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default fetchMenu;
