<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class ReqRecviveFrom
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        Me.Panel2 = New System.Windows.Forms.Panel()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.Panel1 = New System.Windows.Forms.Panel()
        Me.ButtonSave = New System.Windows.Forms.Button()
        Me.RadioButtonReceived = New System.Windows.Forms.RadioButton()
        Me.RadioButtonCanceled = New System.Windows.Forms.RadioButton()
        Me.DataGridView1 = New System.Windows.Forms.DataGridView()
        Me.ButtonSearch = New System.Windows.Forms.Button()
        Me.Label6 = New System.Windows.Forms.Label()
        Me.TextBoxID = New System.Windows.Forms.TextBox()
        Me.ComboBox1 = New System.Windows.Forms.ComboBox()
        Me.Label9 = New System.Windows.Forms.Label()
        Me.Button3 = New System.Windows.Forms.Button()
        Me.DashboardHOMEBUTT = New System.Windows.Forms.Button()
        Me.RequisitionHOMEBUTT = New System.Windows.Forms.Button()
        Me.SuppliersHOMEBUTT = New System.Windows.Forms.Button()
        Me.SuppliesBUTTHOME = New System.Windows.Forms.Button()
        Me.STAFFBUTTHOME = New System.Windows.Forms.Button()
        Me.PatientHOMEBUTT = New System.Windows.Forms.Button()
        Me.HOMEBUTT = New System.Windows.Forms.Button()
        Me.Panel2.SuspendLayout()
        Me.Panel1.SuspendLayout()
        CType(Me.DataGridView1, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'Panel2
        '
        Me.Panel2.BackColor = System.Drawing.SystemColors.ActiveCaption
        Me.Panel2.Controls.Add(Me.Label1)
        Me.Panel2.Location = New System.Drawing.Point(121, -1)
        Me.Panel2.Name = "Panel2"
        Me.Panel2.Size = New System.Drawing.Size(1061, 76)
        Me.Panel2.TabIndex = 110
        '
        'Label1
        '
        Me.Label1.AutoSize = True
        Me.Label1.Font = New System.Drawing.Font("Microsoft Sans Serif", 21.75!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label1.Location = New System.Drawing.Point(248, 25)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(292, 33)
        Me.Label1.TabIndex = 0
        Me.Label1.Text = "Requisition Recvive"
        '
        'Panel1
        '
        Me.Panel1.BackColor = System.Drawing.SystemColors.ActiveCaption
        Me.Panel1.Controls.Add(Me.DashboardHOMEBUTT)
        Me.Panel1.Controls.Add(Me.RequisitionHOMEBUTT)
        Me.Panel1.Controls.Add(Me.SuppliersHOMEBUTT)
        Me.Panel1.Controls.Add(Me.SuppliesBUTTHOME)
        Me.Panel1.Controls.Add(Me.STAFFBUTTHOME)
        Me.Panel1.Controls.Add(Me.PatientHOMEBUTT)
        Me.Panel1.Controls.Add(Me.HOMEBUTT)
        Me.Panel1.Location = New System.Drawing.Point(0, -1)
        Me.Panel1.Name = "Panel1"
        Me.Panel1.Size = New System.Drawing.Size(125, 659)
        Me.Panel1.TabIndex = 109
        '
        'ButtonSave
        '
        Me.ButtonSave.BackColor = System.Drawing.Color.Green
        Me.ButtonSave.Font = New System.Drawing.Font("Microsoft Sans Serif", 14.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.ButtonSave.ForeColor = System.Drawing.SystemColors.ButtonHighlight
        Me.ButtonSave.Location = New System.Drawing.Point(769, 544)
        Me.ButtonSave.Name = "ButtonSave"
        Me.ButtonSave.Size = New System.Drawing.Size(94, 37)
        Me.ButtonSave.TabIndex = 172
        Me.ButtonSave.Text = "Save"
        Me.ButtonSave.UseVisualStyleBackColor = False
        '
        'RadioButtonReceived
        '
        Me.RadioButtonReceived.AutoSize = True
        Me.RadioButtonReceived.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.RadioButtonReceived.Location = New System.Drawing.Point(375, 168)
        Me.RadioButtonReceived.Margin = New System.Windows.Forms.Padding(2, 2, 2, 2)
        Me.RadioButtonReceived.Name = "RadioButtonReceived"
        Me.RadioButtonReceived.Size = New System.Drawing.Size(93, 24)
        Me.RadioButtonReceived.TabIndex = 171
        Me.RadioButtonReceived.TabStop = True
        Me.RadioButtonReceived.Text = "Received"
        Me.RadioButtonReceived.UseVisualStyleBackColor = True
        '
        'RadioButtonCanceled
        '
        Me.RadioButtonCanceled.AutoSize = True
        Me.RadioButtonCanceled.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.RadioButtonCanceled.Location = New System.Drawing.Point(515, 168)
        Me.RadioButtonCanceled.Margin = New System.Windows.Forms.Padding(2, 2, 2, 2)
        Me.RadioButtonCanceled.Name = "RadioButtonCanceled"
        Me.RadioButtonCanceled.Size = New System.Drawing.Size(91, 24)
        Me.RadioButtonCanceled.TabIndex = 170
        Me.RadioButtonCanceled.TabStop = True
        Me.RadioButtonCanceled.Text = "canceled"
        Me.RadioButtonCanceled.UseVisualStyleBackColor = True
        '
        'DataGridView1
        '
        Me.DataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize
        Me.DataGridView1.Location = New System.Drawing.Point(167, 288)
        Me.DataGridView1.Margin = New System.Windows.Forms.Padding(2, 2, 2, 2)
        Me.DataGridView1.Name = "DataGridView1"
        Me.DataGridView1.RowHeadersWidth = 62
        Me.DataGridView1.RowTemplate.Height = 28
        Me.DataGridView1.Size = New System.Drawing.Size(705, 231)
        Me.DataGridView1.TabIndex = 166
        '
        'ButtonSearch
        '
        Me.ButtonSearch.BackColor = System.Drawing.SystemColors.Control
        Me.ButtonSearch.Font = New System.Drawing.Font("Microsoft Sans Serif", 14.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.ButtonSearch.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.ButtonSearch.Location = New System.Drawing.Point(585, 108)
        Me.ButtonSearch.Name = "ButtonSearch"
        Me.ButtonSearch.Size = New System.Drawing.Size(94, 34)
        Me.ButtonSearch.TabIndex = 165
        Me.ButtonSearch.Text = "Search"
        Me.ButtonSearch.UseVisualStyleBackColor = False
        '
        'Label6
        '
        Me.Label6.AutoSize = True
        Me.Label6.Font = New System.Drawing.Font("Microsoft Sans Serif", 10.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label6.Location = New System.Drawing.Point(415, 101)
        Me.Label6.Margin = New System.Windows.Forms.Padding(2, 0, 2, 0)
        Me.Label6.Name = "Label6"
        Me.Label6.Size = New System.Drawing.Size(21, 17)
        Me.Label6.TabIndex = 164
        Me.Label6.Text = "ID"
        '
        'TextBoxID
        '
        Me.TextBoxID.Location = New System.Drawing.Point(419, 120)
        Me.TextBoxID.Margin = New System.Windows.Forms.Padding(2, 2, 2, 2)
        Me.TextBoxID.Name = "TextBoxID"
        Me.TextBoxID.Size = New System.Drawing.Size(155, 20)
        Me.TextBoxID.TabIndex = 163
        '
        'ComboBox1
        '
        Me.ComboBox1.FormattingEnabled = True
        Me.ComboBox1.Items.AddRange(New Object() {"Item", "Drug"})
        Me.ComboBox1.Location = New System.Drawing.Point(431, 253)
        Me.ComboBox1.Margin = New System.Windows.Forms.Padding(2, 2, 2, 2)
        Me.ComboBox1.Name = "ComboBox1"
        Me.ComboBox1.RightToLeft = System.Windows.Forms.RightToLeft.No
        Me.ComboBox1.Size = New System.Drawing.Size(158, 21)
        Me.ComboBox1.TabIndex = 167
        '
        'Label9
        '
        Me.Label9.AutoSize = True
        Me.Label9.Font = New System.Drawing.Font("Microsoft Sans Serif", 10.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label9.Location = New System.Drawing.Point(461, 235)
        Me.Label9.Margin = New System.Windows.Forms.Padding(2, 0, 2, 0)
        Me.Label9.Name = "Label9"
        Me.Label9.Size = New System.Drawing.Size(86, 17)
        Me.Label9.TabIndex = 168
        Me.Label9.Text = "Item or Drug"
        '
        'Button3
        '
        Me.Button3.Font = New System.Drawing.Font("Microsoft Sans Serif", 14.0!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Button3.Location = New System.Drawing.Point(179, 544)
        Me.Button3.Name = "Button3"
        Me.Button3.Size = New System.Drawing.Size(137, 42)
        Me.Button3.TabIndex = 173
        Me.Button3.Text = "Receive"
        Me.Button3.UseVisualStyleBackColor = True
        '
        'DashboardHOMEBUTT
        '
        Me.DashboardHOMEBUTT.Location = New System.Drawing.Point(12, 453)
        Me.DashboardHOMEBUTT.Name = "DashboardHOMEBUTT"
        Me.DashboardHOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.DashboardHOMEBUTT.TabIndex = 34
        Me.DashboardHOMEBUTT.Text = "Dashboard"
        Me.DashboardHOMEBUTT.UseVisualStyleBackColor = True
        '
        'RequisitionHOMEBUTT
        '
        Me.RequisitionHOMEBUTT.Location = New System.Drawing.Point(12, 385)
        Me.RequisitionHOMEBUTT.Name = "RequisitionHOMEBUTT"
        Me.RequisitionHOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.RequisitionHOMEBUTT.TabIndex = 33
        Me.RequisitionHOMEBUTT.Text = "Requisition"
        Me.RequisitionHOMEBUTT.UseVisualStyleBackColor = True
        '
        'SuppliersHOMEBUTT
        '
        Me.SuppliersHOMEBUTT.Location = New System.Drawing.Point(12, 311)
        Me.SuppliersHOMEBUTT.Name = "SuppliersHOMEBUTT"
        Me.SuppliersHOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.SuppliersHOMEBUTT.TabIndex = 32
        Me.SuppliersHOMEBUTT.Text = "Suppliers"
        Me.SuppliersHOMEBUTT.UseVisualStyleBackColor = True
        '
        'SuppliesBUTTHOME
        '
        Me.SuppliesBUTTHOME.Location = New System.Drawing.Point(12, 239)
        Me.SuppliesBUTTHOME.Name = "SuppliesBUTTHOME"
        Me.SuppliesBUTTHOME.Size = New System.Drawing.Size(94, 54)
        Me.SuppliesBUTTHOME.TabIndex = 31
        Me.SuppliesBUTTHOME.Text = "Supplies"
        Me.SuppliesBUTTHOME.UseVisualStyleBackColor = True
        '
        'STAFFBUTTHOME
        '
        Me.STAFFBUTTHOME.Location = New System.Drawing.Point(12, 98)
        Me.STAFFBUTTHOME.Name = "STAFFBUTTHOME"
        Me.STAFFBUTTHOME.Size = New System.Drawing.Size(94, 54)
        Me.STAFFBUTTHOME.TabIndex = 30
        Me.STAFFBUTTHOME.Text = "STAFF"
        Me.STAFFBUTTHOME.UseVisualStyleBackColor = True
        '
        'PatientHOMEBUTT
        '
        Me.PatientHOMEBUTT.Location = New System.Drawing.Point(12, 168)
        Me.PatientHOMEBUTT.Name = "PatientHOMEBUTT"
        Me.PatientHOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.PatientHOMEBUTT.TabIndex = 29
        Me.PatientHOMEBUTT.Text = "Patient"
        Me.PatientHOMEBUTT.UseVisualStyleBackColor = True
        '
        'HOMEBUTT
        '
        Me.HOMEBUTT.Location = New System.Drawing.Point(12, 25)
        Me.HOMEBUTT.Name = "HOMEBUTT"
        Me.HOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.HOMEBUTT.TabIndex = 28
        Me.HOMEBUTT.Text = "HOME"
        Me.HOMEBUTT.UseVisualStyleBackColor = True
        '
        'ReqRecviveFrom
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(918, 614)
        Me.Controls.Add(Me.Button3)
        Me.Controls.Add(Me.ButtonSave)
        Me.Controls.Add(Me.RadioButtonReceived)
        Me.Controls.Add(Me.RadioButtonCanceled)
        Me.Controls.Add(Me.Label9)
        Me.Controls.Add(Me.ComboBox1)
        Me.Controls.Add(Me.DataGridView1)
        Me.Controls.Add(Me.ButtonSearch)
        Me.Controls.Add(Me.Label6)
        Me.Controls.Add(Me.TextBoxID)
        Me.Controls.Add(Me.Panel2)
        Me.Controls.Add(Me.Panel1)
        Me.Margin = New System.Windows.Forms.Padding(2, 2, 2, 2)
        Me.Name = "ReqRecviveFrom"
        Me.Text = "ReqRecviveFrom"
        Me.Panel2.ResumeLayout(False)
        Me.Panel2.PerformLayout()
        Me.Panel1.ResumeLayout(False)
        CType(Me.DataGridView1, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub

    Friend WithEvents Panel2 As Panel
    Friend WithEvents Label1 As Label
    Friend WithEvents Panel1 As Panel
    Friend WithEvents ButtonSave As Button
    Friend WithEvents RadioButtonReceived As RadioButton
    Friend WithEvents RadioButtonCanceled As RadioButton
    Friend WithEvents DataGridView1 As DataGridView
    Friend WithEvents ButtonSearch As Button
    Friend WithEvents Label6 As Label
    Friend WithEvents TextBoxID As TextBox
    Friend WithEvents ComboBox1 As ComboBox
    Friend WithEvents Label9 As Label
    Friend WithEvents Button3 As Button
    Friend WithEvents DashboardHOMEBUTT As Button
    Friend WithEvents RequisitionHOMEBUTT As Button
    Friend WithEvents SuppliersHOMEBUTT As Button
    Friend WithEvents SuppliesBUTTHOME As Button
    Friend WithEvents STAFFBUTTHOME As Button
    Friend WithEvents PatientHOMEBUTT As Button
    Friend WithEvents HOMEBUTT As Button
End Class
