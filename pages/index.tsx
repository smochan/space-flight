import type { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [paginate, setPaginate] = useState(5);
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let start: any = paginate * (page - 1);
    axios
      .get(
        `https://api.spaceflightnewsapi.net/v3/articles?_limit=${paginate}&_start=${start}`
      )
      .then((res) => {
        setData(res.data);
      });
  }, [paginate, page]);

  const handlePaginate = (e: any) => {
    setPaginate(e.target.value);
  };
  const handlePage = (e: any) => {
    setPage(e.target.value);
  };

  const leftClick = () => {
    if (page == 1) return;
    setPage(page - 1);
  };
  const rightClick = () => {
    setPage(page + 1);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Space Flight</title>
        <meta name="description" content="Articles on space flight" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Articles on Space Flight</h1>

        <div className={styles.grid}>
          {data.length &&
            data.map((item, index) => (
              <Link href={`/article/${item.id}`} passHref key={index}>
                <div className={styles.card}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    width={250}
                    height={200}
                  />
                  <h3>{item.title}</h3>
                  <p className={styles.summary}>
                    {item.summary.substring(0, 150) +
                      (item.summary.length > 150 ? "..." : "")}
                  </p>
                </div>
              </Link>
            ))}
        </div>

        <div className={styles.pagination}>
          <select
            id="paginate"
            name="paginate"
            className={styles.select}
            onChange={handlePaginate}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
          <div className={styles.page}>
            <img
              src="/left.svg"
              alt="left"
              className={styles.left}
              width="35"
              onClick={leftClick}
            />
            <p>
              Page : <strong>{page}</strong>
            </p>
            <img
              src="/right.svg"
              alt="right"
              className={styles.right}
              width="35"
              onClick={rightClick}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
