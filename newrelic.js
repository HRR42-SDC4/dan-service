'use strict'

exports.config = {
  app_name: ['dan-service-recommendations'],
  license_key: '8bf4f379c27f868d04089cf80e290eabf4baNRAL',
  logging: {
    level: 'trace',
    filepath: '../../../newrelic_agent.log'
  },
  utilization: {
    detect_aws: false,
    detect_pcf: false,
    detect_azure: false,
    detect_gcp: false,
    detect_docker: false
  },
  transaction_tracer: {
    enabled: true
  }
}
