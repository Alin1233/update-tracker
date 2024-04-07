'use server'
import axios from 'axios'
import { AppType } from '@/schemas/AppType'

/**
 * This function fetches the version tags of a GitHub repository.
 * param {string} url - The URL of the GitHub repository.
 * returns {Array<string>|string} - An array of version tags if successful, or 'error' if the URL is not valid.
 */
export const getAppVersions = async (url: string) => {
    // Extract the repository path from the URL
    const getUrlNames = url.match(/\.com\/(.*)/)
    if (getUrlNames && getUrlNames[1]) {
        // Send a GET request to the GitHub API to fetch the release information of the repository
        const response = await axios.get(
            `https://api.github.com/repos/${getUrlNames[1]}/releases`
        )
        // Map the response data to get the version tags
        const versions = response.data.map(
            (release: { tag_name: string }) => release.tag_name
        )
        // Return the version tags
        return versions
    } else {
        // Return 'error' if the URL is not valid
        return 'error'
    }
}
/**
 * This function fetches the latest version tag of a GitHub repository.
 * param {string} url - The URL of the GitHub repository.
 * returns {string} - The latest version tag if successful, or 'error' if the URL is not valid.
 */
export const getLatestVersion = async (url: string) => {
    // Extract the repository path from the URL
    const getUrlNames = url.match(/\.com\/(.*)/)
    if (getUrlNames && getUrlNames[1]) {
        // Send a GET request to the GitHub API to fetch the latest release information of the repository
        const response = await axios.get(
            `https://api.github.com/repos/${getUrlNames[1]}/releases/latest`
        )
        // Return the name of the latest release
        return response.data.name
    } else {
        // Return 'error' if the URL is not valid
        return 'error'
    }
}

// This function fetches the latest versions of applications hosted on GitHub using GraphQL api.
export const getLatestVersionsGraphQl = async (apps: AppType[]) => {
    // Initialize an empty string to hold the GraphQL query.
    let query = ''

    /**
     * Loop through each application in the provided array.
     * For each application, extract the owner and name from the URL and build a GraphQL query fragment
     * to fetch the latest release.
     */
    apps.forEach((app, index) => {
        // Extract the owner and name of the repository from the app's URL.
        const [owner, name] = app.url.split('/').slice(-2)
        query += `
        repo${index}: repository(owner: "${owner}", name: "${name}") {
          releases(first: 1) {
            nodes {
              name
            }
          }
        }
      `
    })

    // Construct the final GraphQL query by wrapping the individual fragments.
    const finalQuery = `{${query}}`

    // Use Axios to make a POST request to the GitHub GraphQL API endpoint.
    const response = await axios({
        url: 'https://api.github.com/graphql',
        method: 'post',
        headers: {
            Authorization: `bearer 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`,
        },
        data: {
            query: finalQuery,
        },
    })
    const { data } = response.data

    /**
     * Loop through the apps array again to process the response data.
     * For each application, use the corresponding release data from the response
     * to create a new object with the original app data and an added `latestVersion` property.
     */
    return apps.map((app, index) => {
        const latestRelease = data[`repo${index}`].releases.nodes[0]
        return {
            ...app,
            latestVersion: latestRelease ? latestRelease.name : null,
        }
    })
}
