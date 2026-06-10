export default function ArticleImage({ src, alt }) {
    return (
        <div className="mt-12">
            <img
                src={src}
                alt={alt}
                className="w-full h-125 object-cover"
                draggable="false"
            />
        </div>
    );
}