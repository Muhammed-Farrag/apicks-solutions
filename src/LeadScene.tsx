import { useEffect, useRef, useState } from 'react'
import {
  AmbientLight, BoxGeometry, CircleGeometry, ConeGeometry, CylinderGeometry,
  DirectionalLight, Group, Mesh, MeshStandardMaterial, PerspectiveCamera,
  PointLight, Scene, SphereGeometry, TorusGeometry, WebGLRenderer,
  PCFSoftShadowMap, SRGBColorSpace,
} from 'three'

function building(x: number, z: number, scale: number) {
  const group = new Group()
  const walls = new Mesh(new BoxGeometry(.95, .84, .75), new MeshStandardMaterial({ color: '#eee8d7', roughness: .78 }))
  walls.position.y = .42
  walls.castShadow = true
  group.add(walls)
  const roof = new Mesh(new ConeGeometry(.72, .48, 4), new MeshStandardMaterial({ color: '#137f3f', roughness: .55 }))
  roof.position.y = .94
  roof.rotation.y = Math.PI / 4
  roof.castShadow = true
  group.add(roof)
  for (const side of [-.24, .21]) {
    const window = new Mesh(new BoxGeometry(.2, .28, .02), new MeshStandardMaterial({ color: '#bc955c', metalness: .25, roughness: .35 }))
    window.position.set(side, .43, .383)
    group.add(window)
  }
  group.position.set(x, -.13, z)
  group.scale.setScalar(scale)
  return group
}

export default function LeadScene() {
  const mount = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const element = mount.current
    if (!element) return
    let renderer: WebGLRenderer
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
    } catch {
      setFailed(true)
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setClearColor('#103d25', 0)
    renderer.outputColorSpace = SRGBColorSpace
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = PCFSoftShadowMap
    element.appendChild(renderer.domElement)

    const scene = new Scene()
    const camera = new PerspectiveCamera(34, 1, .1, 100)
    camera.position.set(4.5, 3.55, 5.8)
    camera.lookAt(0, .28, 0)
    scene.add(new AmbientLight('#ffffff', 2.5))
    const sun = new DirectionalLight('#ffffff', 3.3)
    sun.position.set(5, 7, 5)
    sun.castShadow = true
    sun.shadow.mapSize.set(512, 512)
    scene.add(sun)
    const glow = new PointLight('#7be29c', 20)
    glow.position.set(-4, 2, -1)
    scene.add(glow)

    const world = new Group()
    world.rotation.set(.09, -.42, 0)
    scene.add(world)
    const base = new Mesh(new CylinderGeometry(2.48, 2.48, .22, 48), new MeshStandardMaterial({ color: '#0d4429', roughness: .8 }))
    base.position.y = -.34
    base.receiveShadow = true
    world.add(base)
    const ring = new Mesh(new TorusGeometry(2.04, .017, 8, 64), new MeshStandardMaterial({ color: '#b99461', metalness: .55, roughness: .32 }))
    ring.position.y = -.21
    ring.rotation.x = -Math.PI / 2
    world.add(ring)
    const ground = new Mesh(new CircleGeometry(1.93, 48), new MeshStandardMaterial({ color: '#195c36', roughness: .88 }))
    ground.position.y = -.18
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    world.add(ground)
    world.add(building(-.95, .25, .75), building(.35, -.48, .92), building(1.19, .76, .62))
    const goldMarker = new Mesh(new SphereGeometry(.09, 12, 12), new MeshStandardMaterial({ color: '#d3ad71', emissive: '#9d7d41', emissiveIntensity: .22 }))
    goldMarker.position.set(.3, 1.46, .14)
    world.add(goldMarker)

    const resize = () => {
      const width = element.clientWidth
      const height = element.clientHeight
      if (!width || !height) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(element)
    resize()
    let frame = 0
    let last = performance.now()
    let elapsed = 0
    const stopRendering = () => {
      cancelAnimationFrame(frame)
      renderer.domElement.remove()
      setFailed(true)
    }
    const contextLost = (event: Event) => {
      event.preventDefault()
      stopRendering()
    }
    renderer.domElement.addEventListener('webglcontextlost', contextLost)
    const tick = (time: number) => {
      const delta = Math.min((time - last) / 1000, .05)
      last = time
      elapsed += delta
      world.rotation.y += delta * .075
      world.position.y = Math.sin(elapsed * .65) * .055
      try { renderer.render(scene, camera) }
      catch { stopRendering(); return }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      renderer.domElement.removeEventListener('webglcontextlost', contextLost)
      observer.disconnect()
      scene.traverse((object) => {
        if (!(object instanceof Mesh)) return
        object.geometry.dispose()
        const materials = Array.isArray(object.material) ? object.material : [object.material]
        materials.forEach((material) => material.dispose())
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div className="three-scene" ref={mount} aria-hidden="true">{failed && <div className="visual-fallback"><img src="./images/modern.webp" alt="" draggable={false} /></div>}</div>
}
