import Image from "next/image";
export default function DetailView({item}) {
    console.log(item.links[4])

    const imageLink = item.links.find(link => link.rel === "canonical") ?? item.link[0];
    const imageThumb = item.links.find(link => link.rel === "preview") ?? item.link[0];

    console.log(imageLink.href)

    return (
        <div>
            <h1>Title: {item.data[0].title}</h1>
            <p>Description: {item.data[0].description}</p>
            <div>Date taken: {item.data[0].date_created}</div>
            <div>Location: {item.data[0].location}</div>
            <div>Photographer: {item.data[0].photographer}</div>
            <Image src={imageThumb.href} alt={item.data[0].title} height={400} width={400} />
            <a href={imageLink.href}>Download Image</a>
        </div>
    )

}
