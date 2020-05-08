'use strict'

const AWS = require('aws-sdk')

AWS.config.update({
    region: process.env.AWS_REGION_SNS,
    accessKeyId: process.env.AWS_SNS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SNS_SECRET_ACCESS_KEY,
})



function send (to, subject, message) {
    // Create sendEmail params
    var params = {
        Destination: {
            ToAddresses: [
                to,
            ],
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: message,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject,
            },
        },
        Source: process.env.ENROLL_EMAIL,
        ReplyToAddresses: [
            process.env.ENROLL_EMAIL,
        ],
    }

    // Create the promise and SES service object
    return new AWS.SES({apiVersion: '2012-10-17'}).sendEmail(params).promise();
}

function sendEnrollmentEmail (name, email, affiliation, newsletter) {
    const subject = '[1APP4PT] - Nova adesão';
    const message = `Dados de adesão:<br/><ul><li>nome: ${name}</li><li>email: ${email}</li><li>afiliação: ${affiliation}</li><li>newsletter: ${newsletter}</li></ul>`;
    let promise = send(process.env.ENROLL_EMAIL, subject, message);

    console.log('Sending email...')

    // Handle promise's fulfilled/rejected states
    promise.then(
        function (data) {
            console.log('Enrollment email sent', data.MessageId)
        }).catch(
        async function (err) {
            console.error('Error sending enrollment email', err)
        },
    )

    return promise;

}

module.exports = {
    SES: {
        send,
        sendEnrollmentEmail,
    },
}
