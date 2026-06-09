import svgContent from '../assets/MapLucera.svg?raw'

export default function MapLucera() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgContent }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    />
  )
}
