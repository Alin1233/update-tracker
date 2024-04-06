'use server'
import axios from 'axios'
export const getAppVersion = async (url: string) => {
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
