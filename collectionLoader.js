const axios = require('axios');
const cheerio = require('cheerio');

async function nftLoader (page) {

	await page.evaluate(() => {

		// the data schemes
		const collection =  {
			"collection_name": "", //
			"collection_id": "",
			"item_number": "",
			"owners": "",
			"volume_traded": "",
			"floor_price": "",
			"created_by": "",
			"description": "",
			"discord": "",
			"instagram": "",
			"collection_banner": "",
			"collection_image": ""
		   }

 collection.collection_name =  document.querySelector('.kwoLpy') && document.querySelector('.kwoLpy').innerText;
 collection.created_by =       document.querySelector(".lomMYf") && document.querySelector(".lomMYf").innerText;
 collection.description =      document.querySelector(".dIkstu") && document.querySelector(".dIkstu").innerText;
 const popper = document.querySelectorAll(".kjKHBl")
 collection.item_number =   popper[0].innerText;
 collection.floor_price =   popper[1].innerText;
 collection.owners =        popper[2].innerText;
 collection.volume_traded = popper[3].innerText;

		    collection.collection_banner = document.querySelector('.cover-image')   && document.querySelector('.cover-image')            .src
			collection.collection_image =  document.querySelectorAll('.eRkDwW')[0].firstChild && document.querySelectorAll('.eRkDwW')[0].firstChild       .src
			collection.name =              document.querySelector('.PmVco')         && document.querySelector('.PmVco')                      .textContent.trim()
			
	 	document.querySelectorAll(".dfRghT").forEach((li)=>{
				if (li.textContent.trim().includes("Created")) {
					collection.created = li.textContent.split("Created")[1].trim() * 1
					if (!collection.created) {
						collection.created = ""
					}
				}
			})

			collection.collection_id = collection.collection_name.includes(" ") ? (()=>{
         const a = collection.collection_name.split(" ")
		 a.pop()
		 return a.join("-")
			})() : collection.collection_name

			document.querySelectorAll(".kExCTt a").forEach(el => {	
	if (el.href.includes("insta")) {
		collection.instagram = el.href
	}
	if (el.href.includes("twi")) {
		collection.twitter = el.href
	}
		if (el.href.includes("dis")) {
		collection.discord = el.href
	}
});

			for (const i in collection) {
				console.log( i, collection[i])
			  }

			  fetch("https://wazirnft.herokuapp.com/collection",
			  {
				  headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				  },
				  method: "POST",
				  body: JSON.stringify(collection)
			  })
			  .then(function(res){ console.log(res) })
			  .catch(function(res){ console.log(res) })
	  });
// await page.close()
};

module.exports = nftLoader