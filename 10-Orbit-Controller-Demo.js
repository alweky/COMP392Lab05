/// <reference path="Libs/three.min.js" />
/// <reference path="Libs/OrbitControls.js" />

var camera, scene, renderer;
var clock, orbitController;
var body, holder, step=0, step2=0, direction = 1;

//functions
function init() {
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

function setupCameraAndLights() {
    camera = new THREE.PerspectiveCamera(
        45,                                     //angle
        window.innerWidth/window.innerHeight,   //aspect
        0.1,                                    //near plane
        1000                                    //far plane
        );
    camera.position.set(20, 20, -20);
    camera.lookAt(new THREE.Vector3(10, 0, 0));
    //add some ambient light
    scene.add(new THREE.AmbientLight(0x333333));

    //orbit controller
    clock = new THREE.Clock();
    orbitController = new THREE.OrbitControls(camera);

    orbitController.autoRotate = true;
	
	 var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);
}

function addGeometries() {
    var axis = new THREE.AxisHelper(10);
    scene.add(axis);

	body = new THREE.Object3D();
	holder = new THREE.Object3D();

	var cylMat = new THREE.MeshLambertMaterial({ color: 0x7777ff });
	var cylGeo = new THREE.CylinderGeometry(2, 2, 2, 20, 1, false);
	cylinder = new THREE.Mesh(cylGeo, cylMat);         
	cylinder.position.x = 10;
	cylinder.position.y = 14;
	body.add(cylinder);
	cylGeo = new THREE.CylinderGeometry(3, 3, .5, 20, 1, false);
	cylinder = new THREE.Mesh(cylGeo, cylMat);         
	cylinder.position.x = 10;
	cylinder.position.y = 13;
	body.add(cylinder);
	var cirMat = new THREE.MeshLambertMaterial({ color: 0x5d2222 });
	var cirGeo = new THREE.SphereGeometry(2,20,20,0,Math.PI * 2,0,Math.PI);
	var circle = new THREE.Mesh(cirGeo, cirMat);        
	circle.position.x = 10;
	circle.position.y = 12;
	body.add(circle);
	transMat = new THREE.MeshLambertMaterial({color:0xffffff, transparent: true, opacity: 0.5});
	cylGeo = new THREE.CylinderGeometry(.5, .5, 7, 20, 1, false);
	cylinder = new THREE.Mesh(cylGeo, transMat);         
	cylinder.position.x = 10;
	cylinder.position.y = 7;
	body.add(cylinder);	
	var cirGeo = new THREE.SphereGeometry(2,20,20,0,Math.PI * 2,0,Math.PI);
	circle = new THREE.Mesh(cirGeo, transMat);        
	circle.position.x = 10;
	circle.position.y = 2;
	body.add(circle);
	var waterMat = new THREE.MeshLambertMaterial({color:0x28416e})
	var waterGeoCyl = new THREE.CylinderGeometry(.4, .4, 5, 20, 1, false);
	cylinder = new THREE.Mesh(waterGeoCyl, waterMat);
	cylinder.position.x = 10;
	cylinder.position.y = 4;
	body.add(cylinder);
	var WaterGeoCir = new THREE.SphereGeometry(1.5,20,20,0,6.3,2.8,2);
	circle = new THREE.Mesh(WaterGeoCir, waterMat);        
	circle.position.x = 10;
	circle.position.y = 2;
	body.add(circle);
	scene.add(body);
	
	var boxGeo = new THREE.BoxGeometry(.1,7,2,1,1,1);
	//var boxMat = new THREE.MeshLambertMaterial({color:0x832626});
	var boxMat = new THREE.MeshLambertMaterial({color:0xa5a5a5});
	var box = new THREE.Mesh(boxGeo, boxMat);
	box.position.x = 13;
	box.position.y = 5;
	holder.add(box);
	box = new THREE.Mesh(boxGeo, boxMat);
	box.position.x = 7;
	box.position.y = 5;
	holder.add(box);
	boxGeo = new THREE.BoxGeometry(.1,2,2,1,1,1);
	boxMat = new THREE.MeshLambertMaterial({color:0x832626});
	box = new THREE.Mesh(boxGeo, boxMat);
	box.position.x = 13;
	box.position.y = 0.5;
	holder.add(box);
	box = new THREE.Mesh(boxGeo, boxMat);
	box.position.x = 7;
	box.position.y = .5;
	holder.add(box);
	boxGeo = new THREE.BoxGeometry(.1,2,5,1,1,1);
	box = new THREE.Mesh(boxGeo, boxMat);
	box.position.x = 13;
	box.position.y = -1;
	box.position.z = 1;
	holder.add(box);
	box = new THREE.Mesh(boxGeo, boxMat);
	box.position.x = 7;
	box.position.y = -1;
	box.position.z = 1;
	holder.add(box);
	boxGeo = new THREE.BoxGeometry(6,.1,5,1,1,1);
	box = new THREE.Mesh(boxGeo, boxMat);
	box.position.x = 10;
	box.position.y = -2;
	box.position.z = 1;
	holder.add(box);
	scene.add(holder);
	
/*     var boxGeo = new THREE.BoxGeometry(10, 10, 10);
    var boxMat = new THREE.MeshPhongMaterial({ color: 0x7777ff });
    var box = new THREE.Mesh(boxGeo, boxMat);
    scene.add(box); */
}

function animate() {
    orbitController.update(clock.getDelta());
	step2++;
	if(step2 % 100 == 0)
	{
		direction = direction * -1;	
	}
	if(direction == -1)
	{
		step = step - 1;
	}
	else
	{
		step++;
	}
	
	body.rotation.x = step / 70;
	
	console.log(step + " " + direction + " " + step2);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

window.onload = function(){
    init();
    addGeometries();
    setupCameraAndLights();
    animate();
}