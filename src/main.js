import './style.css'
import * as three from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { Mesh, Object3D } from 'three';

const scene    = new three.Scene()
const camera   = new three.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new three.WebGLRenderer({
	canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight )
camera.position.setZ(30)

renderer.render( scene, camera )

//const geometry = new three.TorusGeometry( 10, 3, 16, 100 )
//const material = new three.MeshStandardMaterial( { color: 0xFF6347 } )
//const torus    = new three.Mesh( geometry, material )
//scene.add( torus )

const pointlight   = new three.PointLight( 0xFFFFFF )
pointlight.position.set( 5,20,5 )
scene.add( pointlight )

const ambientlight = new three.AmbientLight( 0x444444 )
scene.add( ambientlight )

const spaceTexture = new three.TextureLoader().load( 'space.jpg' )
scene.background = spaceTexture


const objloader  = new OBJLoader()
const mtlloader  = new MTLLoader()
var obj = new Object3D()
mtlloader.load( 'material.mtl',
	function( object ) {
		objloader.setMaterials( object )
	},
	undefined,
	function( error ) { console.error( error ) }
)
objloader.load( 'tile_sign.obj',
	function( object ) {
		obj = object
	},
	undefined,
	function( error ) { console.error( error ) }
)
const object = obj
scene.add(object)


animate()

function animate() {
	requestAnimationFrame( animate )

	object.rotation.x += 0.01
	object.rotation.y += 0.005
	object.rotation.z += 0.01

	renderer.render( scene, camera )
}

function add_star() {
	const geometry = new three.SphereGeometry( 0.25, 24, 24 )
	const material = new three.MeshStandardMaterial( { color: 0xFFFFFF } )
	const star = new three.Mesh( geometry, material )

	const [x,y,z] = Array(3).fill().map(() => three.MathUtils.randFloatSpread( 100 ) )

	star.position.set( x,y,z )
	scene.add( star )
}
Array(200).fill().forEach(add_star)