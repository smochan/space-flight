import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/article.module.css";

import axios from "axios";
import Link from "next/link";

const Article: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://api.spaceflightnewsapi.net/v3/articles/${id}`)
        .then((res) => {
          setData(res.data);
        });
    }
  }, [id]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {data ? (
          <>
            <h1 className={styles.title}>{data.title}</h1>
            <div className={styles.detail}>
              <p>
                <strong>News Site :</strong> {data.newsSite}
              </p>
              <p>
                <strong>Published on:</strong>{" "}
                {data.publishedAt.substring(0, 10)}
              </p>
            </div>
            <img
              className={styles.image}
              src={data.imageUrl}
              alt={data.title}
            />
            <p className={styles.summary}>{data.summary}</p>
            <div className={styles.links}>
              <Link href="/">
                <a className={styles.link}>Back to home</a>
              </Link>
              <Link href={data.url}>
                <a className={styles.link}>Read full article</a>
              </Link>
            </div>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </main>
    </div>
  );
};
export default Article;
