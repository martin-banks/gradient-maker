function getGradient() {
	const elem = document.querySelector('.gradient')
	return {
		elem,
		rect() {
			return elem.getBoundingClientRect()
		},
		coords() {
			return {
				x: this.rect().left,
				y: this.rect().top,
			}
		},
		size() {
			return {
				width: this.rect().width,
				height: this.rect().height,
			}
		}
	}
}
	
	
const gradient = getGradient()

const picker = document.querySelector('.picker')
const printColors = document.querySelector('.colors')
const printCoord = {
	x: document.querySelector('.coord__x'),
	y: document.querySelector('.coord__y'),
}
const split = 15
const increments = 360 / split
const colors = [...new Array(increments)]
	.map((inc, i) => `hsl(${i * split}, 100%, 50%)`)
	.join()


/*

255, 0 ,0			0-60
255, 255, 0		61-120
0, 255, 0			121-180
0, 255, 255		181-240
0, 0, 255			241-300
255, 0, 255		301-360


converting hue from hsl to rgb
each color break is 1/6 of the full 360 hue range

- find color bracket
- how far through that bracket 
- apply that percentag to 


rgb contains
main / darker / lighter

from hsl
if l > 50%
	lighter = l
	darker = 0
if l < 50%
	lighter = 0
	darker = l
else 
	lighter = 0
	darker = 0


*/

function convertRGB(pctX, pctY, hsl) {
	const hue = pctX * 360
	const split = 60
	const bracket = Math.floor(hue / split)
	const isEven = bracket % 2
	const l = hsl[2].split('%')[0]
	const value = () => {
		
		
		// const main = ((pctX * (255 * 6)) - (bracket * 255))
		
		
// 		const hueRemaining = val => ((255 - val) / 255) * 255
		
// 		const tintChange = change => {
// 			if (lighterPct) {
// 				console.log(lighterPct, lighter, hueRemaining(change))
// 				return Math.floor(lighter + (hueRemaining(change) * lighterPct))
// 			} else if (darkerPct) {
// 				return Math.floor(darker - (hueRemaining(change) * lighterPct))
// 			}
// 			return 0
// 		}
	
		// console.log(tintChange())

		// const change = Math.floor((l / 100) * ((pctX * (255 * 6)) - (bracket * 255))) + lighter
		// const change = Math.floor(isEven ? 255 - newChange + tintChange(newChange) : newChange + tintChange(newChange))  
		
		// console.log({ change, lighter, darker })
		// let light = Math.floor((pctY - 0.5) * (255 * 2))
		// light = light < 0 ? 0 : light
		// light = light > 255 ? 255 : light
		// let dark = Math.floor(((0.5 - pctY) * (255)))
		// dark = dark < 0 ? 0 : dark
		// dark = dark > 255 ? 255 : dark
		// console.log({ bracket, change, dark, light })
		// let lighter = 0
		// let darker = 255

		
		const lighterPct = l > 50 ? 1 - (l - 50) / 50 : false
		const darkerPct = l < 50 ? (l / 50) : false
		console.log({ lighterPct, darkerPct })
		const colorDiff = color => {
			const shade = lighterPct || darkerPct || 0
			return Math.floor((255 - color) * shade)
		}

		let lighter = Math.floor(0 + ((l > 50 ? (l - 50) / 100 * (255 * 2) : 0) ))
		let darker = Math.floor(255 + ((l < 50 ? (l-50) / 100 * (255 * 2) : 0) ))
		const modifier = 0
		// let newChange = ((l / 100) * ((pctX * (255 * 6)) - (bracket * 255)) * 2)
		let newChange = (pctX * 255 * 5) - (bracket * 255)
		let main = Math.floor(isEven ? 255 - newChange : newChange)
		const change = main
		// console.log(colorDiff(newChange))
		return [
			`(${darker}, ${change}, ${lighter})`,
			`(${change}, ${darker}, ${lighter})`,
			`(${lighter}, ${darker}, ${change})`,
			`(${lighter}, ${change}, ${darker})`,
			`(${change}, ${lighter}, ${darker})`,
			`(${darker}, ${lighter}, ${change})`,
		]
	}
	return value()[bracket]
}



function handleMouseOver(e) {
	const coords = {
		x: e.x - gradient.coords().x,
		y: e.y - gradient.coords().y,
	}
	const pct  = {
		x: coords.x / gradient.size().width,
		y: coords.y / gradient.size().height,
	}
	
	const colors = {
		hsl: [
			Math.floor(pct.x * 360), 
			'100%', 
			`${Math.floor((pct.y * 100))}%`,
		],
		rgb: `rgb()`,
	}
	picker.style.opacity = 1
	picker.style.transform = `translate(${coords.x - (picker.offsetWidth / 2)}px, ${coords.y - (picker.offsetWidth / 2)}px)`
	// printCoord.x.innerHTML = `x: ${coords.x}px`
	// printCoord.y.innerHTML = `y: ${coords.y}px`
	printColors.innerHTML = `
		<p style="color: black !important">bracket: ${Math.floor((pct.x * 360) / 60)}</p>
		<p style="background: hsl(${colors.hsl.join()})" >hsl(${colors.hsl.join()})</p>
		<p style="background: rgb${convertRGB(pct.x, pct.y, colors.hsl)}" >rgb${convertRGB(pct.x, pct.y, colors.hsl)}</p>
	`

	if (parseInt(colors.hsl[2].split('%')[0], 10) < 30) {
		printColors.style.color = 'white'
	} else {
		printColors.style.color = ''
	}
}

function handleMouseOut(e) {
	picker.style.opacity = 0

}

// the first gradient aplied will appear on top
gradient.elem.style.backgroundImage = `
	linear-gradient(rgba(0,0,0,1), rgba(255,255,255,0), rgba(255,255,255,1)),
	linear-gradient(90deg, ${colors})
`

gradient.elem.addEventListener('mouseover', handleMouseOver)
gradient.elem.addEventListener('mousemove', handleMouseOver)
gradient.elem.addEventListener('mouseout', handleMouseOut)
gradient.elem.addEventListener('mouseleave', handleMouseOut)
// TODO - only get colors from click adn drag

