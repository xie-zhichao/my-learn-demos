import io
import os.path
import glob
from pathlib import Path
from notion.block import PageBlock
from notion.client import NotionClient
from md2notion.upload import upload

client = NotionClient(
    token_v2="0bc3cc254a77bd9c46944a9782a50e30a9dc86289bdde020d9541d04db30169e89ecb243ce194109544f835424f5b780073f65be826e29cb9873c637016f7f30abe696f1b8f9443ca3fcba7feb4b")
page = client.get_block(
    "https://www.notion.so/hexo-import-48e2e041b90d4b2bb4644ef35fa892be")

for fp in glob.glob("/Users/xiezhichao/workspace/learn/myPages/source/_posts/*.md", recursive=True):
    with open(fp, "r", encoding="utf-8") as mdFile:
        # Preprocess the Markdown frontmatter into yaml code fences
        mdStr = mdFile.read()
        mdChunks = mdStr.split("---")
        mdStr = (
            f'```yaml'
            f'{mdChunks[1]}'
            f'```'
            f''
            f"{'---'.join(mdChunks[2:])}"
        )
        mdFile = io.StringIO(mdStr)
        mdFile.__dict__["name"] = fp  # Set this so we can resolve images later

        pageName = os.path.basename(fp)[:40]
        newPage = page.children.add_new(PageBlock, title=pageName)
        print(f"Uploading {fp} to Notion.so at page {pageName}")
        # Get the image relative to the markdown file in the flavor that Hexo
        # stores its images (in a folder with the same name as the md file)

        def convertImagePath(imagePath, mdFilePath):
            return Path(mdFilePath).parent / Path(mdFilePath).stem / Path(imagePath)
        upload(mdFile, newPage, imagePathFunc=convertImagePath)
