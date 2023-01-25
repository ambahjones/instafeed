import { useRef } from "react";

export function Instafeed(props: any) {
  const { id, caption, media_type, media_url, key } = props.props;
  console.log(props)
  const video = useRef<HTMLVideoElement>(null);
  let post;
  console.log(props.props.id)

  switch (media_type) {
    case "VIDEO":
      post = (
        <video
          ref={video}
          width="100%"
          height="auto"
          src={media_url}
          controls
          playsInline
        ></video>
      );
      break;
    case "CAROUSEL_ALBUM":
      post = (
        <img width="100%" height="auto" id={id} src={media_url} alt={caption} />
      );
      break;
    default:
      post = (
        <img width="100%" height="auto" id={id} src={media_url} alt={caption} />
      );
  }
  return <div className="m-2 max-h-[25rem] overflow-hidden" key={key}>{post}</div>;
}
