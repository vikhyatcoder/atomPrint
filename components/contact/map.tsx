export default function Map() {
  return (
    <div className="mt-8 rounded-lg overflow-hidden border h-[400px] w-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0673431806853!2d-122.2698244!3d37.8719139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80857c2b10690417%3A0xa7f25a186f2a9d4!2sUniversity%20of%20California%2C%20Berkeley!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Atom Print Location"
      ></iframe>
    </div>
  )
}
