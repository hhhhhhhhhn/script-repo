const FILE = `../scripts/${location.href.split("?")[1] || ""}.mds`

//// MDS load
function get(url) {
	return new Promise((resolve, reject)=>{
		fetch(url, {cache: "no-cache"})
  			.then((response) => {
    			if (response.ok)
      				return response.text()
    			else
					throw Error(response.statusText)
  			})
  			.then((text) => {
				resolve(text)
  			}).catch(() => {
    			resolve("")
  			})
	})
}

async function loadScipt(){
	let script = await get(FILE) 
		||"# Script Not Found\n## 404 Error"
	mds.create("mds", script, {bindings:{
		"log": console.log
	}, outraw:true})
}

loadScipt()

//// Set navbar source
document.addEventListener("DOMContentLoaded", ()=>{
	document.getElementById("source").setAttribute("href", FILE)
	document.title = location.href.split(/[\/\?]+/gi).slice(-1)[0]
})
