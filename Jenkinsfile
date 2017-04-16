#!groovy
@Library(['github.com/joostvdg/jenkins-pipeline-lib']) _

pipeline {
    agent { label 'docker' }
    options {
        timeout(time: 60, unit: 'MINUTES')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }
    stages {
        stage('Setup Workspace') {
            steps {
                deleteDir()
            }
        }
        stage('Prepare') {
            steps {
                parallel (
                        SCM: {
                            git 'https://github.com/joostvdg/jishi.git'
                        },
                        SettingsXml: {
                            writeFile encoding: 'UTF-8', file: 'settings.xml', text: '''<settings>
                        <mirrors>
                            <mirror>
                            <id>drove-nexus</id>
                            <name>Drove Nexus</name>
                            <url>https://drove.westeurope.cloudapp.azure.com:8443/nexus/repository/maven-public/</url>
                            <mirrorOf>central</mirrorOf>
                            </mirror>
                        </mirrors>
                        </settings>'''
                        }
                )
            }
            post {
                success {
                    notifyAtomist("UNSTABLE", "STARTED")
                }
            }
        }
        stage('Build') {
            steps {
                sh 'chmod +x build.sh'
                sh 'sh build.sh 1 "-s settings.xml -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true -Dmaven.wagon.http.ssl.ignore.validity.dates=true"'
            }
        }
        stage('Sonar') {
            steps {
                withSonarQubeEnv('DroveSonarQube') {
                    sh 'sh mvnw sonar:sonar'
                }
            }
        }
        stage('Prepare Docker Image'){
            steps {
                parallel (
                    TestDockerfile: {
                        script {
                            def lintResult = sh returnStdout: true, script: 'docker run --rm -i lukasmartinelli/hadolint < Dockerfile'
                            if (lintResult.trim() == '') {
                                println 'Lint finished with no errors'
                            } else {
                                println 'Error found in Lint'
                                println "${lintResult}"
                                currentBuild.result = 'UNSTABLE'
                            }
                        }
                    }, // end test dockerfile
                    BuildImage: {
                        withCredentials([usernamePassword(credentialsId: 'dockerregistry', passwordVariable: 'PSS', usernameVariable: 'USR')]) {
                            sh "docker login drovetfregistry.azurecr.io -u ${env.USR} -p ${env.PSS}"
                            sh 'docker build --tag=jishi .'
                            sh 'docker tag kearos-blog drovetfregistry.azurecr.io/jvandergriendt/jishi'
                            sh 'docker push drovetfregistry.azurecr.io/jvandergriendt/jishi'
                        }
                    }
                )
            }
        }
    }
    post {
        always {
            step([$class: 'WsCleanup', notFailBuild: true])
        }
        success {
            notifyAtomist("SUCCESS")
        }
        failure {
            notifyAtomist("FAILURE")
        }
        unstable {
            notifyAtomist("UNSTABLE")
        }
        changed {
            echo "Status Changed: [From: $currentBuild.previousBuild.result, To: $currentBuild.result]"
        }
    }
}
