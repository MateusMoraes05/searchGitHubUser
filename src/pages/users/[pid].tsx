import { useEffect, useState } from "react";

import { GetStaticPaths, GetStaticProps } from "next";
import Link from 'next/link'
import Head from 'next/head'

import axios from "axios";

import styles from '../../../styles/modules/profile.module.css'

export default function Handler({ content }) {


    const [userState, setUserState] = useState([])

    useEffect(() => {
        setUserState([content])
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>{content.login}</title>
            </Head>
            {
                userState.map(user => {
                    return (
                        <div key={user.id} className={styles.userContainer}>
                            <img src={`${user.avatar_url}`} alt={`${user.login}`} />
                            <main>
                                <h3><b>{user.name}</b></h3>
                                <h4>{user.login}</h4>
                                <div className={styles.subBox}>
                                    <a><Link href={`/friends/${user.login}`}><p><b>{user.followers}</b> followers</p></Link></a>
                                    <p><b>{user.following}</b> following</p>
                                </div>
                            </main>
                        </div>
                    )
                })
            }
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { pid } = context.params
    const { data } = await axios.get(`https://api.github.com/users/${pid}`)
    return {
        props: {
            content: data
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    };
}
