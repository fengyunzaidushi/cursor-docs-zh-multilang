import { redirect } from 'next/navigation'
import { allDocs } from 'contentlayer/generated'

// 添加格式化路径的辅助函数
function formatDocPath(path: string, locale: string): string {
    // 分割路径
    const parts = path.split('/')

    // 找到 docs 后的部分
    const docsIndex = parts.findIndex(part => part === 'docs')
    const pathParts = parts.slice(docsIndex + 1)

    // 格式化每个部分并重新组合
    const formattedParts = pathParts
        .map(part => part.replace(/^\d+-/, ''))
        .join('/')

    // 构建最终路径
    if (locale === 'en') {
        return `/docs/${formattedParts}`
    }

    return `/${locale}/docs/${formattedParts}`
}

// 添加获取数字前缀的辅助函数
function getNumericPrefix(str: string): number {
    const match = str.match(/^\d+/)
    return match ? parseInt(match[0]) : Infinity
}

// 添加获取第一个文档的函数
function findFirstDocument(docs: any[]): any {
    // 按文件路径分组
    const docsByFolder = docs.reduce((acc, doc) => {
        const parts = doc.filePath.split('/')
        const folder = parts[2] // docs/[folder]/file
        if (!acc[folder]) {
            acc[folder] = []
        }
        acc[folder].push(doc)
        return acc
    }, {} as Record<string, any[]>)

    // 获取排序后的第一个文件夹
    const firstFolder = Object.keys(docsByFolder)
        .sort((a, b) => getNumericPrefix(a) - getNumericPrefix(b))[0]

    if (!firstFolder || !docsByFolder[firstFolder].length) {
        return null
    }

    // 在第一个文件夹中获取排序后的第一个文件
    return docsByFolder[firstFolder]
        .sort((a, b) => {
            const aName = a.filePath.split('/').pop()
            const bName = b.filePath.split('/').pop()
            return getNumericPrefix(aName) - getNumericPrefix(bName)
        })[0]
}

interface PageProps {
    params: Promise<{
        locale: string
    }>
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function DocsPage({ params }: PageProps) {
    const resolvedParams = await params
    // 获取当前语言的文档
    const docs = allDocs.filter(doc => {
        const docLocale = doc.filePath.split('/')[1]
        return docLocale === resolvedParams.locale
    })

    // 找到第一个文档
    const firstDoc = findFirstDocument(docs)

    if (!firstDoc) {
        // 如果没有找到文档，重定向到 404 页面或首页
        redirect(`/${resolvedParams.locale}`)
    }

    // 使用格式化后的路径进行重定向
    const formattedPath = formatDocPath(firstDoc.path, resolvedParams.locale)
    redirect(formattedPath)
} 