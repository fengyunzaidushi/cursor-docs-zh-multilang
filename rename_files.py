import os

# 定义基础文件映射关系
base_mappings = {
    '001-get-started': {
        'migrate-from-vscode.mdx': '01-migrate-from-vscode.mdx',
        'usage.mdx': '02-usage.mdx',
        'what-is-cursor.mdx': '03-what-is-cursor.mdx'
    },
    '005-tab': {
        'overview.mdx': '01-overview.mdx',
        'from-gh-copilot.mdx': '02-from-gh-copilot.mdx',
        'advanced-features.mdx': '03-advanced-features.mdx'
    },
    '015-chat': {
        'overview.mdx': '01-overview.mdx',
        'customize.mdx': '02-customize.mdx',
        'codebase.mdx': '03-codebase.mdx',
        'apply.mdx': '04-apply.mdx'
    },
    '020-cmdk': {
        'overview.mdx': '01-overview.mdx',
        'terminal-cmdk.mdx': '02-terminal-cmdk.mdx'
    },
    '025-context': {
        'codebase-indexing.mdx': '01-codebase-indexing.mdx',
        'rules-for-ai.mdx': '02-rules-for-ai.mdx',
        'ignore-files.mdx': '03-ignore-files.mdx'
    },
    '025-context/@-symbols': {
        'basic.mdx': '01-basic.mdx',
        '@-files.mdx': '02-@-files.mdx',
        '@-folders.mdx': '03-@-folders.mdx',
        '@-code.mdx': '04-@-code.mdx',
        '@-docs.mdx': '05-@-docs.mdx',
        '@-git.mdx': '06-@-git.mdx',
        '@-codebase.mdx': '07-@-codebase.mdx',
        '@-web.mdx': '08-@-web.mdx',
        '@-chat.mdx': '09-@-chat.mdx',
        '@-definitions.mdx': '10-@-definitions.mdx',
        '@-link.mdx': '11-@-link.mdx'
    },
    '035-privacy': {
        'privacy.mdx': '01-privacy.mdx'
    },
    '040-advanced': {
        'models.mdx': '01-models.mdx',
        'api-keys.mdx': '02-api-keys.mdx',
        'ai-review.mdx': '03-ai-review.mdx',
        'shadow-workspace.mdx': '04-shadow-workspace.mdx'
    },
    '045-troubleshooting': {
        'common-issues.mdx': '01-common-issues.mdx',
        'troubleshooting-guide.mdx': '02-troubleshooting-guide.mdx'
    }
}

# 生成多语言文件映射
def generate_language_mappings():
    """为每个语言生成完整的文件映射"""
    file_mappings = {}
    languages = ['en', 'zh']
    
    for lang in languages:
        for dir_path, files in base_mappings.items():
            full_path = os.path.join('data/docs', lang, dir_path)
            file_mappings[full_path] = files
            
    return file_mappings

def rename_files():
    """批量重命名文件"""
    file_mappings = generate_language_mappings()
    
    for directory, files in file_mappings.items():
        print(f"\n处理目录: {directory}")
        
        # 确保目录存在
        if not os.path.exists(directory):
            print(f"警告: 目录不存在 - {directory}")
            continue
            
        for old_name, new_name in files.items():
            old_path = os.path.join(directory, old_name)
            new_path = os.path.join(directory, new_name)
            
            # 检查源文件是否存在
            if not os.path.exists(old_path):
                print(f"警告: 文件不存在 - {old_path}")
                continue
                
            try:
                os.rename(old_path, new_path)
                print(f"成功: {old_name} -> {new_name}")
            except Exception as e:
                print(f"错误: 重命名失败 {old_name} -> {new_name}")
                print(f"错误信息: {str(e)}")

if __name__ == '__main__':
    print("开始重命名文件...")
    rename_files()
    print("\n重命名操作完成!") 