# browsebox-web

[![Build status](https://github.com/browsebox/browsebox-web/actions/workflows/ci.yml/badge.svg?branch=master&event=push)](https://github.com/browsebox/browsebox-web/actions/workflows/ci.yml)
[![GitHub release](https://img.shields.io/github/release/browsebox/browsebox-web.svg)](https://github.com/browsebox/browsebox-web/releases/latest)
[![CodeFactor](https://www.codefactor.io/repository/github/browsebox/browsebox-web/badge)](https://www.codefactor.io/repository/github/browsebox/browsebox-web)

Central repository for BrowseBox.

## Developing browsebox-web

Please make sure you have the following prerequisites:

- An IDE such as [Visual Studio Code](https://code.visualstudio.com/download) or [WebStorm](https://www.jetbrains.com/webstorm/)
- Node.js 18.3.0
- Docker and Docker Compose

## Running the back end with Docker

- Install [Docker](https://www.docker.com/community-edition) and [git](https://git-scm.com).
- Open any terminal of your choice.
- Clone your fork of this repository.

### Building docker image

Managing docker images and containers can be done from Docker Desktop, but we will be using the CLI to setup our database.
Navigate to the root of the repository and run this command to build an image of the database.

```bash
docker build -t browsebox-mysql .
```

Ensure your image is up-to-date and rebuild periodically whenever neccessary. In order to update the image, you must remove the image with `docker image rm [image-name]` and rerun the build command.

### Running with `docker-compose`

Once you've finished building the image, run this command to start the back end.

```bash
docker-compose up -d
```

## Installing dependencies

Run the following command to install `npm` dependencies:

```bash
npm install --force
```

## Licence

BrowseBox code is licensed under the [MIT licence](https://opensource.org/licenses/MIT). Please see [the licence file](LICENCE) for more information. [tl;dr](https://tldrlegal.com/license/mit-license) you can do whatever you want as long as you include the original copyright and license notice in any copy of the software/source.
