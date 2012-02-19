﻿<?xml version="1.0" encoding="utf-8"?>
<serviceModel xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" name="nodeoverflow_demo" generation="1" functional="0" release="0" Id="bfc6d6e1-3ed6-465b-a009-356df7240d24" dslVersion="1.2.0.0" xmlns="http://schemas.microsoft.com/dsltools/RDSM">
  <groups>
    <group name="nodeoverflow_demoGroup" generation="1" functional="0" release="0">
      <componentports>
        <inPort name="nodeworker:HttpIn" protocol="tcp">
          <inToChannel>
            <lBChannelMoniker name="/nodeoverflow_demo/nodeoverflow_demoGroup/LB:nodeworker:HttpIn" />
          </inToChannel>
        </inPort>
      </componentports>
      <settings>
        <aCS name="nodeworkerInstances" defaultValue="[1,1,1]">
          <maps>
            <mapMoniker name="/nodeoverflow_demo/nodeoverflow_demoGroup/MapnodeworkerInstances" />
          </maps>
        </aCS>
      </settings>
      <channels>
        <lBChannel name="LB:nodeworker:HttpIn">
          <toPorts>
            <inPortMoniker name="/nodeoverflow_demo/nodeoverflow_demoGroup/nodeworker/HttpIn" />
          </toPorts>
        </lBChannel>
      </channels>
      <maps>
        <map name="MapnodeworkerInstances" kind="Identity">
          <setting>
            <sCSPolicyIDMoniker name="/nodeoverflow_demo/nodeoverflow_demoGroup/nodeworkerInstances" />
          </setting>
        </map>
      </maps>
      <components>
        <groupHascomponents>
          <role name="nodeworker" generation="1" functional="0" release="0" software="C:\Development\node\nodeoverflow\server\nodeoverflow_demo\local_package.csx\roles\nodeworker" entryPoint="base\x64\WaHostBootstrapper.exe" parameters="base\x64\WaWorkerHost.exe " memIndex="1792" hostingEnvironment="consoleroleadmin" hostingEnvironmentVersion="2">
            <componentports>
              <inPort name="HttpIn" protocol="tcp" portRanges="80" />
            </componentports>
            <settings>
              <aCS name="__ModelData" defaultValue="&lt;m role=&quot;nodeworker&quot; xmlns=&quot;urn:azure:m:v1&quot;&gt;&lt;r name=&quot;nodeworker&quot;&gt;&lt;e name=&quot;HttpIn&quot; /&gt;&lt;/r&gt;&lt;/m&gt;" />
            </settings>
            <resourcereferences>
              <resourceReference name="DiagnosticStore" defaultAmount="[4096,4096,4096]" defaultSticky="true" kind="Directory" />
              <resourceReference name="EventStore" defaultAmount="[1000,1000,1000]" defaultSticky="false" kind="LogStore" />
            </resourcereferences>
          </role>
          <sCSPolicy>
            <sCSPolicyIDMoniker name="/nodeoverflow_demo/nodeoverflow_demoGroup/nodeworkerInstances" />
            <sCSPolicyFaultDomainMoniker name="/nodeoverflow_demo/nodeoverflow_demoGroup/nodeworkerFaultDomains" />
          </sCSPolicy>
        </groupHascomponents>
      </components>
      <sCSPolicy>
        <sCSPolicyFaultDomain name="nodeworkerFaultDomains" defaultPolicy="[2,2,2]" />
        <sCSPolicyID name="nodeworkerInstances" defaultPolicy="[1,1,1]" />
      </sCSPolicy>
    </group>
  </groups>
  <implements>
    <implementation Id="7c9662f4-10df-47a7-b23b-4e44632ca521" ref="Microsoft.RedDog.Contract\ServiceContract\nodeoverflow_demoContract@ServiceDefinition">
      <interfacereferences>
        <interfaceReference Id="7e0ba7f9-0384-4701-a662-a07f99af8e40" ref="Microsoft.RedDog.Contract\Interface\nodeworker:HttpIn@ServiceDefinition">
          <inPort>
            <inPortMoniker name="/nodeoverflow_demo/nodeoverflow_demoGroup/nodeworker:HttpIn" />
          </inPort>
        </interfaceReference>
      </interfacereferences>
    </implementation>
  </implements>
</serviceModel>