from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import MessageEntity, UserEntity
from .serializers import MessageEntitySerializer


@csrf_exempt
@api_view(['POST'])
def login(request):
    data = request.data
    mail = data.get('mail')
    password = data.get('password')
    try:
        user = UserEntity.objects.get(mail=mail, password=password)
        request.session['user_id'] = user.id
        request.session.save()
        return JsonResponse(True, safe=False)
    except UserEntity.DoesNotExist:
        return JsonResponse(False, safe=False)


@csrf_exempt
@api_view(['POST'])
def signup(request):
    data = request.data
    user = UserEntity.objects.create(
        name=data['name'],
        mail=data['mail'],
        password=data['password'],
        isAdmin=data.get('isAdmin', False)
    )
    request.session['user_id'] = user.id
    request.session.save()
    return JsonResponse({'status': 'ok'})


@api_view(['GET'])
def check_login(request):
    return JsonResponse('user_id' in request.session, safe=False)


@api_view(['GET'])
def users(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return JsonResponse([], safe=False)

    user = UserEntity.objects.get(id=user_id)
    user_list = UserEntity.objects.exclude(id=user_id)
    usernames = [u.name for u in user_list]
    return JsonResponse(usernames, safe=False)


@csrf_exempt
@api_view(['POST'])
def select_chat(request):
    current_user_id = request.session.get('user_id')
    if not current_user_id:
        return Response([])

    current_user = UserEntity.objects.get(id=current_user_id)
    name = request.data.get("name")

    try:
        other_user = UserEntity.objects.get(name=name)
    except UserEntity.DoesNotExist:
        return Response([])

    messages = MessageEntity.objects.filter(
        from_user__in=[current_user, other_user],
        to_user__in=[current_user, other_user]
    ).order_by("date")

    serialized = MessageEntitySerializer(messages, many=True)
    return Response(serialized.data)


@csrf_exempt
@api_view(['POST'])
def save_message(request):
    current_user_id = request.session.get('user_id')
    if not current_user_id:
        return JsonResponse({'status': 'not logged in'}, status=403)

    current_user = UserEntity.objects.get(id=current_user_id)
    data = request.data
    text = data.get('text')
    name = data.get('to')
    try:
        to_user = UserEntity.objects.get(name=name)
    except UserEntity.DoesNotExist:
        return JsonResponse({'status': 'user not found'}, status=404)
    MessageEntity.objects.create(
        text=text,
        from_user=current_user,
        to_user=to_user
    )
    return JsonResponse({'status': 'ok'})


@api_view(['POST'])
def exit_user(request):
    request.session.flush()
    return JsonResponse({'status': 'ok'})


@api_view(['GET'])
def hello(request):
    name = request.GET.get("name", "World")
    return JsonResponse({"message": f"Hello {name}!"})


@csrf_exempt
@api_view(['POST'])
def delete_user(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return JsonResponse({'status': 'unauthorized'}, status=401)
    try:
        admin_user = UserEntity.objects.get(id=user_id)
        if not admin_user.isAdmin:
            return JsonResponse({'status': 'forbidden'}, status=403)
        name_to_delete = request.data.get('name')
        user_to_delete = UserEntity.objects.get(name=name_to_delete)
        user_to_delete.delete()
        return JsonResponse({'status': 'ok'})
    except UserEntity.DoesNotExist:
        return JsonResponse({'status': 'user not found'}, status=404)


@api_view(['GET'])
def current_user(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return JsonResponse({}, status=401)
    user = UserEntity.objects.get(id=user_id)
    return JsonResponse({'name': user.name, 'isAdmin': user.isAdmin})
