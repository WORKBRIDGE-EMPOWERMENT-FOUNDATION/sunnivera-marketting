import Image from 'next/image'

// Add photos to /public/photos, then set `src` (e.g. '/photos/site.webp'). Empty src shows a placeholder slot.
const photos = [
  { src: '', hint: '/photos/site.webp', alt: 'Project site during mobilisation', caption: 'Site mobilisation', ratio: '4 / 5' },
  { src: '', hint: '/photos/warehouse.webp', alt: 'Materials staged in a warehouse', caption: 'Materials staged for dispatch', ratio: '4 / 5' },
  { src: '', hint: '/photos/delivery.webp', alt: 'Delivery arriving on site', caption: 'Delivery on site', ratio: '4 / 5' },
]

export default function PhotoStrip() {
  return (
    <section className="photos" aria-label="Sunivera in the field">
      <div className="wrap">
        <p className="kicker">On the ground</p>
        <div className="pgrid">
          {photos.map((p, i) => (
            <figure className="photo" key={p.hint}>
              <div className="ph" style={{ aspectRatio: p.ratio }}>
                {p.src ? <Image src={p.src} alt={p.alt} fill sizes="(max-width: 900px) 100vw, 400px" /> : <span>Photo slot<br />{p.hint}</span>}
              </div>
              <figcaption><b>FIG. {String(i + 1).padStart(2, '0')}</b> {p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
