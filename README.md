# CZ4034 Information Retrieval Assignment

## Included in this repository:
### > Query UI (/front-end)
### > Solr Server (/solr-9.5.0)

## Clone and navigate 
Clone this repo by either running `git clone https://github.com/eugene-swj/ir_query.git` or by using Github Desktop.

## Steps
### Start Solr Server
#### *Prerequisite: Java is required for Solr. Minimum Java version is Java 11, recommended version is JRE 17.
1. Navigate to the solr folder using command prompt -> <your installed path>/solr-9.5.0/bin.
2. Run `solr start` to start the solr server.
3. After server has started, check that solr has started by using your Internet Browser and enter `http://localhost:8983` into the url.
4. If you can see the Solr website, the server is running fine.
5. To view the core that was set up for this assignment, select `steamreviews` in the core selection at the bottom left.

### Start React Application
#### *Prerequisite: Nodejs is required to run command.
1. Navigate to the folder (front-end/) using command prompt.
2. Run `npm i` to install dependencies.
3. After installing dependencies, run `npm start` to start the React App.
