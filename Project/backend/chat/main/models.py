from django.db import models


class UserEntity(models.Model):
    name = models.CharField(max_length=100)
    mail = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    isAdmin = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class MessageEntity(models.Model):
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    from_user = models.ForeignKey(UserEntity, related_name='sent_messages', on_delete=models.CASCADE)
    to_user = models.ForeignKey(UserEntity, related_name='received_messages', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.from_user.name} → {self.to_user.name}: {self.text[:20]}"
