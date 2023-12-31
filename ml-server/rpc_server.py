#!venv/bin/python
import pika
import random

def classificationModel(input):
    """
    Fake binary classification model
    """

    classificationResults = [True, False]
    return random.choice(classificationResults)

def on_request(ch, method, props, body):

    print(f"Received {str(body)}...")
    response = classificationModel(body)
    print(f"Done processing correlation_id: {props.correlation_id}.")

    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(correlation_id = \
                                                         props.correlation_id),
                     body=str(response))
    ch.basic_ack(delivery_tag=method.delivery_tag)

if __name__ == '__main__':
    connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))

    channel = connection.channel()

    channel.queue_declare(queue='rpc_queue')

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='rpc_queue', on_message_callback=on_request)

    print(" [x] Awaiting RPC requests")
    channel.start_consuming()