from rest_framework import serializers
from .models import MessageEntity, UserEntity


class UserEntitySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEntity
        fields = ['id', 'name', 'mail']


class MessageEntitySerializer(serializers.ModelSerializer):
    from_user = UserEntitySerializer()
    to_user = UserEntitySerializer()

    class Meta:
        model = MessageEntity
        fields = ['id', 'text', 'date', 'from_user', 'to_user']
