<x-mail::message>
# Hello, someone has sent a concern

<h3> Name: {{$data['name']}}  </h3>
<h3> Email: {{$data['email']}}  </h3>
<h3> Message: {{$data['message']}}  </h3>



Thanks,<br>
{{ $data['name'] }}
</x-mail::message>
