import axios from 'axios'
import { useState } from 'react'

export function convertCamelCase(camelCaseStr) {
    // Insert a space before each uppercase letter, then capitalize the first letter of each word
    return camelCaseStr
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // Add a space between lowercase and uppercase letters
        .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize the first letter of each word
}



