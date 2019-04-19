library(
    identifier: 'pipeline-lib@4.3.0',
    retriever: modernSCM([$class: 'GitSCMSource',
                          remote: 'https://github.com/SmartColumbusOS/pipeline-lib',
                          credentialsId: 'jenkins-github-user'])
)

properties([
    pipelineTriggers([scos.dailyBuildTrigger()]),
])

def image
def doStageIf = scos.&doStageIf
def doStageIfRelease = doStageIf.curry(scos.changeset.isRelease)
def doStageUnlessRelease = doStageIf.curry(!scos.changeset.isRelease)
def doStageIfPromoted = doStageIf.curry(scos.changeset.isMaster)

node('infrastructure') {
    ansiColor('xterm') {
        scos.doCheckoutStage()

        doStageUnlessRelease('Build') {
            image = docker.build("scos/discovery-ui:${env.GIT_COMMIT_HASH}")
        }

        doStageUnlessRelease('Deploy to Dev') {
            scos.withDockerRegistry {
                image.push()
                image.push('latest')
            }
            deployUiTo(environment: 'dev')
        }


        doStageIfPromoted('Deploy to Staging') {
            def environment = 'staging'

            deployUiTo(environment: environment)

            scos.applyAndPushGitHubTag(environment)

            scos.withDockerRegistry {
                image.push(environment)
            }
        }

        doStageIfRelease('Deploy to Production') {
            def releaseTag = env.BRANCH_NAME
            def promotionTag = 'prod'

            /* change internal to false when we're ready to release */
            deployUiTo(environment: 'prod', internal: false)

            scos.applyAndPushGitHubTag(promotionTag)

            scos.withDockerRegistry {
                image = scos.pullImageFromDockerRegistry("scos/discovery-ui", env.GIT_COMMIT_HASH)
                image.push(releaseTag)
                image.push(promotionTag)
            }
        }
    }
}

def deployUiTo(params = [:]) {
    def environment = params.get('environment')
    if (environment == null) throw new IllegalArgumentException("environment must be specified")

    def internal = params.get('internal', true)

    scos.withEksCredentials(environment) {
        def terraformOutputs = scos.terraformOutput(environment)
        def subnets = terraformOutputs.public_subnets.value.join(/\\,/)
        def allowInboundTrafficSG = terraformOutputs.allow_all_security_group.value
        def certificateARNs = [terraformOutputs.root_tls_certificate_arn.value,terraformOutputs.tls_certificate_arn.value].join(/\\,/)
        def ingressScheme = internal ? 'internal' : 'internet-facing'
        def VERSION="${env.GIT_COMMIT_HASH}"
        def dnsZone = terraformOutputs.internal_dns_zone_name.value
        def rootDnsZone = terraformOutputs.root_dns_zone_name.value


        sh("""#!/bin/bash
            set -xe

            helm init --client-only
            helm upgrade --install discovery-ui ./chart \
                --namespace=discovery \
                --set ingress.enabled="true" \
                --set ingress.scheme="${ingressScheme}" \
                --set ingress.subnets="${subnets}" \
                --set ingress.security_groups="${allowInboundTrafficSG}" \
                --set ingress.dns_zone="${dnsZone}" \
                --set ingress.root_dns_zone="${rootDnsZone}" \
                --set ingress.certificate_arns="${certificateARNs}" \
                --set image.tag="${VERSION}" \
                --set image.environment="${environment}"
        """.trim())
    }
}
