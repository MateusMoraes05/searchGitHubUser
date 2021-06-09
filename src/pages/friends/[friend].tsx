import { useEffect, useState } from "react";

import { GetStaticPaths, GetStaticProps } from "next";
import Head from 'next/head'
import Link from 'next/link'

import axios from "axios";

import styles from '../../../styles/modules/friends.module.css'

export default function Handler({ content, name }) {

    const [friendState, setFriendState] = useState([])

    useEffect(() => {
        setFriendState(content)
    }, [])

    return (
        <ul className={styles.container}>
            <Head>
                <title>{name} friends</title>
            </Head>
            {
                friendState.map(user => {

                    return (
                    <>
                    <a>
                        <Link href={`/users/${user.login}`}>
                        <li key={user.id} className={styles.userContainer}>
                            <img src={`${user.avatar_url}`} alt={`${user.login}`} />
                            <main>
                                <h3><b>{user.name}</b></h3>
                                <h4>{user.login}</h4>
                            </main>
                        </li>
                        </Link>
                    </a>
                    </>
                    )
                })
            }
        </ul>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { friend } = context.params
    const { data } = await axios.get(`https://api.github.com/users/${friend}/followers`)
    return {
        props: {
            content: data,
            name: friend
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    };
}
