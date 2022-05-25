const scraperObject = async (browser, url) => {
	let page = await browser.newPage();
	await page.setDefaultNavigationTimeout(0); 
	console.log(`Navigating to ${url}...`);
	await page.goto(url);

	// Wait for the required DOM to be rendered;
	await page.waitForSelector('.cover-image');
	await page.waitForFunction(() => document.readyState === "complete");
	await page.waitForTimeout(3000);

	await page.evaluate(() => {

		// the data schemes
		const user = {
			"name":"",
			"username":"",
			"followers": "",
			"following": "",
			"bio":"",
			"banner_image":"",
			"profile_image":"",
			"facebook" : "",
			"instagram": "",
			"twitter": "",
			"invited_by": "",
			"collections": "",
			"created": "",
			"collected": "",
			"isVerified": false
			}

		    user.banner_image =  document.querySelector('.cover-image')   && document.querySelector('.cover-image')            .src
			user.profile_image = document.querySelectorAll('.eRkDwW')[0].firstChild && document.querySelectorAll('.eRkDwW')[0].firstChild       .src
			user.name =          document.querySelector('.PmVco')         && document.querySelector('.PmVco')                      .textContent.trim()
			user.username =      document.querySelector('.bwVqEG')        && document.querySelector('.bwVqEG')                      .textContent.trim()
			user.bio =           document.querySelector('.short-text')    && document.querySelector('.short-text')                     .textContent.trim()
			user.instagram =     document.querySelector('.sc-liAPKD').children[0]     && document.querySelector('.sc-liAPKD').children[0]                .href
			user.twitter =       document.querySelector('.sc-liAPKD') .children[1]    && document.querySelector('.sc-liAPKD').children[1]                   .href
			user.followers =     document.querySelectorAll('.hBkTwE')[1]  && document.querySelectorAll('.hBkTwE')[1]               .textContent.trim()
			if (user.followers.includes("K")) {
				user.followers = user.followers.split("K")[0] + "000"
			}
			user.following =     document.querySelectorAll('.hBkTwE')[2]  && document.querySelectorAll('.hBkTwE')[2]           .textContent.trim()
			user.isVerified = document.querySelector(".bi-patch-check-fill") ? true : false
			document.querySelectorAll(".dfRghT").forEach((li)=>{
				if (li.textContent.trim().includes("Created")) {
					user.created = li.textContent.split("Created")[1].trim() * 1
					if (!user.created) {
						user.created = ""
					}
				}
			})

			for (const i in user) {
				console.log( i, user[i])
			}

	   fetch("https://wazirnft.herokuapp.com/users",
			{
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify(user)
			})
			.then(response => response.json())
			.then(data => console.log(data.message))
			.catch(function (err){ console.log(err) })
	  });
	//   await page.close()
}

module.exports = scraperObject;