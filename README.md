# jishi

## Example data


### Template Attributes

```json
{
  "description": "The maven groupId",
  "key": "groupId",
  "value": "com.github.joostvdg",
  "valueType": "string",
  "required": true
}
```

```json
{
  "description": "The maven artifactId",
  "key": "artifactId",
  "value": "jishi",
  "valueType": "string",
  "required": true
}
```

```json
{
  "description": "The display name, used for reporting and dashboards",
  "key": "displayName",
  "value": "Jishi",
  "valueType": "string",
  "required": true
}
```

```json
{
  "description": "The namespace to which this instance belongs",
  "key": "namespace",
  "value": "Keep",
  "valueType": "string"
}
```

```json
{
  "description": "Keywords for spring boot",
  "key": "spring-boot-keywords",
  "value": "web,security,jpa",
  "valueType": "string"
}
```

```json
{
  "description": "Code Repository key",
  "key": "scm-key",
  "value": "gitlab",
  "valueType": "string",
  "required": true
}
```


### Template

```json
{
  "description": "Flusso Java Maven template",
  "name": "JavaMaven-1.0",
  "templateAttributes": [
    "http://localhost:8080/templateAttribute/1",
    "http://localhost:8080/templateAttribute/2",
    "http://localhost:8080/templateAttribute/3",
    "http://localhost:8080/templateAttribute/4",
    "http://localhost:8080/templateAttribute/5",
    "http://localhost:8080/templateAttribute/6"
  ],
  "type": "APPLICATION"
}
```
