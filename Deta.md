#How to deploy your api to deta.sh [follow this](https://deta.space/builder/new)
1. Create a free account on [deta.sh](https://deta.space/signup)
1. Download deta CLI for windows
open powershell and run:
    ```powershell
    iwr https://get.deta.dev/space-cli.ps1 -useb | iex
    ```
1. Login your CLI to deta:
    ```powershell
    space login
    ```
1. To add your project to deta, go to your project root directory in powershell and run:
    ```powershell
    space new
    ```
1. Add your environment variables:
    Follow this document https://deta.space/docs/en/build/fundamentals/the-space-runtime/configuration/#custom-variables
    
1. Deploy your changes:
    ```powershell
    space push
    ```
Copy your endpoint and test at your browser/postman:
Builder instance: "https://nodesimpletest-1-b4583119.deta.app"

For more info go to: https://deta.space/docs/en/build/new-apps