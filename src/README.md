# Remote Markdown Panel

Renders markdown from a remote URL.

**Note:** Be sure to enter the URL of a "raw" markdown file. In GitHub/GitLab, you'll need to click on the "raw" button to see this URL.

## Features:
* Renders "GitHub-flavored" markdown with `marked-react` and `marked-emoji`.
* Provides optional `Source` and `Edit` buttons.
* Request comes from the user's browser, so if they are logged into GitHub they will be able to see private markdown files.
* Great for `README.md` files, supports Gists, and works well with dark/light mode.
