## Usecases

Usually it's one use case for one endpoint. In this example, we have 5 endpoints so we need 5 use cases. Why one use case for one endpoint? For the simple reason, if you have a monolithic code and you want to move on serverless, each use case will be one function (lambda, GCP function, firebase function,…) or if one use case has to be exported to another API ( could be a lambda ) you will copy past your use case, inject the dependency (logger, repository) and the logic will be done.
