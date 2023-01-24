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
    console.log(token);

    useEffect(() => {
      // this is to avoid memory leaks
      const abortController = new AbortController();

      async function fetchInstagramPost() {
        try {
          axios
            .get(
              `https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token=${token}`
            )
            .then((resp) => {
              setFeedsData(resp.data.data);
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

    return (
      <div className="grid grid-cols-3 my-12">
        {feeds.map((feed) => (
          <Instafeed props={feed} />
        ))}
      </div>
    );
}

Feed.defaultProps = {
    limit: 6,
}