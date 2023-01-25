import { useState, useEffect, useRef } from "react";
import { Instafeed } from "../instafeed";
import axios from 'axios';

export interface FeedProps {
    limit: number;
}

export default function Feed (props: FeedProps) {
    const { limit } = props;
    const [feeds, setFeedsData] = useState([]);
    const token = process.env["REACT_APP_INSTA_ACCESS_TOKEN"]; 
    //const tokenProp = useRef(token);


    useEffect(() => {
      // this is to avoid memory leaks
      const abortController = new AbortController();

      async function fetchInstagramPost() {
        try {
          await axios
            .get(
              `https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption&limit=${limit}&access_token=${token}`
            )
            .then(res => {
              setFeedsData(res.data.data);
            });
        } catch (err) {
          console.log("error", err);
        }
      }

      // manually call the fecth function
      fetchInstagramPost();

      return () => {
        // cancel pending fetch request on component unmount
        abortController.abort();
      };
    }, [token, limit]);
    console.log(feeds)


    return (
      <div className="grid grid-cols-3 m-12">
        {feeds.map((feed, key) => (
          <Instafeed key={key} props={feed} />
        ))}
      </div>
    );
}

Feed.defaultProps = {
    limit: 6,
}