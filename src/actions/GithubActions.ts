'use server'
import axios from 'axios'
import { AppType } from '@/schemas/AppType'
export const getAppVersions = async (url: string) => {
    const getUrlNames = url.match(/\.com\/(.*)/)
    if (getUrlNames && getUrlNames[1]) {
        const response = await axios.get(
            `https://api.github.com/repos/${getUrlNames[1]}/releases`
        )
        const versions = response.data.map(
            (release: { tag_name: string }) => release.tag_name
        )
        return versions
    } else {
        return 'error'
    }
}
export const getLatestVersion = async (url: string) => {
    const getUrlNames = url.match(/\.com\/(.*)/)
    if (getUrlNames && getUrlNames[1]) {
        const response = await axios.get(
            `https://api.github.com/repos/${getUrlNames[1]}/releases/latest`
        )
        return response.data.name
    } else {
        return 'error'
    }
}

export const getLatestVersionsGraphQl = async (apps: AppType[]) => {
    let query = ''
    apps.forEach((app, index) => {
        const [owner, name] = app.url.split('/').slice(-2)
        query += `repo${index}: repository(owner: "${owner}", name: "${name}"){
            releases (first: 1){
                nodes {
                    name
                }
            }
        }`
    })

    const response = await axios({
        url: 'https://api.github.com/graphql',
        method: 'post',
        headers: {
            Authorization: `bearer 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`,
        },
        data: {
            query: `{${query}}`,
        },
    })
    const { data } = response.data
    return apps.map((app, index) => {
        const latestRelease = data[`repo${index}`].releases.nodes[0]
        return {
            ...app,
            latestVersion: latestRelease ? latestRelease.name : null,
        }
    })
}
