pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo '1. Checking out the code from the repository...'
                // Jenkins automatically checks out the code, but this step is included for clarity.
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '2. Installing dependencies using npm...'
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo '3. Building the production bundle...'
                // This command runs the 'build' script defined in your package.json.
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                echo '4. Deploying the application...'
                // TODO: Replace this with your specific deployment commands.
                // Examples:
                // sh 'scp -r dist/* user@yourserver:/var/www/html' // Copy files via SCP
                // or
                // sh 'aws s3 sync ./dist s3://your-s3-bucket --delete' // Deploy to AWS S3
            }
        }
    }

    post {
        always {
            // Clean up the workspace after the pipeline finishes.
            cleanWs()
        }
        success {
            echo 'Pipeline finished successfully! 🚀'
        }
        failure {
            echo 'Pipeline failed. Check the logs for errors. 🐞'
        }
    }
}